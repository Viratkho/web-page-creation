"""Comprehensive integration tests for CatalogCraft API."""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

# Create in-memory SQLite database for isolated test execution
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_database():
    """Create fresh tables for every test run and drop them after."""
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


SAMPLE_STATE_PAYLOAD = {
    "store": {
        "name": "Artisan Bakery Corner",
        "tag": "Baked Fresh Every Morning at Dawn",
        "sub": "Golden flaky pastries and sourdough loaves.",
        "contact": "Call or WhatsApp us to order.",
        "address": "8 Baker Street, Flour & Butter Corner",
        "hours": "Tue - Sun: 7:30 AM - 8:30 PM",
        "phone": "+91 98333 44556",
        "email": "orders@buttercroissant.com",
        "cur": "₹",
    },
    "designSystem": "warm-bakery",
    "tokenOverrides": {"primary": "#b45309"},
    "bgPreset": "bg-warm",
    "layout": "grid",
    "buttonShape": "shape-pill",
    "buttonEffect": "glow",
    "sections": {
        "announcement": {"enabled": True, "text": "Promo: 20% off!"},
        "header": {"enabled": True},
        "hero": {
            "enabled": True,
            "title": "Fresh Pastries Daily",
            "subtitle": "Baked with real butter.",
            "cta": "Browse Bakery",
            "badge": "FRESH OVEN",
        },
        "categories": {"enabled": True},
        "products": {"enabled": True},
        "features": {"enabled": True},
        "faqs": {"enabled": True},
        "contact": {"enabled": True},
        "footer": {"enabled": True},
        "fab": {"enabled": True},
    },
    "products": [
        {
            "id": "p1",
            "n": "Butter Croissant",
            "p": "120",
            "op": "150",
            "c": "Pastries",
            "e": "🥐",
            "d": "Flaky French pastry",
            "x": "Best Seller",
            "f": True,
            "rating": 4.9,
            "i": "data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=",
        },
        {
            "id": "p2",
            "n": "Sourdough Loaf",
            "p": "220",
            "op": "250",
            "c": "Breads",
            "e": "🍞",
            "d": "Fermented 24 hours",
            "x": "",
            "f": False,
            "rating": 4.8,
            "i": None,
        },
    ],
    "features": [
        {"icon": "🌾", "title": "Organic Flour", "desc": "Stone-ground local grain"}
    ],
    "faqs": [
        {"q": "Do you deliver?", "a": "Yes, within 5km radius."}
    ],
    "elementOverrides": {
        "#hero-title": {"color": "#92400e"}
    },
}


# ============================================================================
# 1. Health check test
# ============================================================================

def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "version" in data


# ============================================================================
# 2. Project CRUD tests
# ============================================================================

def test_create_project(client):
    response = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["store"]["name"] == "Artisan Bakery Corner"
    assert data["designSystem"] == "warm-bakery"
    assert data["tokenOverrides"]["primary"] == "#b45309"
    assert len(data["products"]) == 2
    assert data["products"][0]["n"] == "Butter Croissant"
    assert data["products"][0]["p"] == "120"
    assert data["products"][0]["f"] is True
    assert len(data["features"]) == 1
    assert len(data["faqs"]) == 1
    assert "#hero-title" in data["elementOverrides"]


def test_get_project(client):
    # Create first
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    # Fetch
    get_res = client.get(f"/api/projects/{project_id}")
    assert get_res.status_code == 200
    data = get_res.json()
    assert data["id"] == project_id
    assert data["store"]["name"] == "Artisan Bakery Corner"
    assert data["store"]["phone"] == "+91 98333 44556"
    assert len(data["products"]) == 2


def test_get_nonexistent_project_returns_404(client):
    response = client.get("/api/projects/non-existent-uuid")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_update_project(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    updated_payload = dict(SAMPLE_STATE_PAYLOAD)
    updated_payload["store"] = dict(SAMPLE_STATE_PAYLOAD["store"])
    updated_payload["store"]["name"] = "Artisan Bakery & Cafe"
    updated_payload["designSystem"] = "luxury-serif"

    put_res = client.put(f"/api/projects/{project_id}", json=updated_payload)
    assert put_res.status_code == 200
    data = put_res.json()
    assert data["store"]["name"] == "Artisan Bakery & Cafe"
    assert data["designSystem"] == "luxury-serif"


def test_list_projects(client):
    # Create two projects
    client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    second_payload = dict(SAMPLE_STATE_PAYLOAD)
    second_payload["store"] = dict(SAMPLE_STATE_PAYLOAD["store"])
    second_payload["store"]["name"] = "Bookstore Boutique"
    client.post("/api/projects", json=second_payload)

    # List all
    list_res = client.get("/api/projects")
    assert list_res.status_code == 200
    projects = list_res.json()
    assert len(projects) == 2

    # Filter with query
    search_res = client.get("/api/projects?q=Bookstore")
    assert search_res.status_code == 200
    found = search_res.json()
    assert len(found) == 1
    assert "Bookstore" in found[0]["name"]


def test_delete_project(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    del_res = client.delete(f"/api/projects/{project_id}")
    assert del_res.status_code == 204

    # Verify 404 after deletion
    get_res = client.get(f"/api/projects/{project_id}")
    assert get_res.status_code == 404


def test_duplicate_project(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    dup_res = client.post(f"/api/projects/{project_id}/duplicate")
    assert dup_res.status_code == 201
    dup_data = dup_res.json()
    assert dup_data["id"] != project_id
    assert "Copy" in dup_data["store"]["name"]
    assert len(dup_data["products"]) == 2


# ============================================================================
# 3. Product nested CRUD tests
# ============================================================================

def test_add_product_to_project(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    new_prod = {
        "id": "p3",
        "n": "Pain au Chocolat",
        "p": "140",
        "op": "160",
        "c": "Pastries",
        "e": "🍫",
        "d": "Rich chocolate batons rolled in puff pastry",
        "x": "New",
        "f": True,
        "rating": 5.0,
        "i": None,
    }
    add_res = client.post(f"/api/projects/{project_id}/products", json=new_prod)
    assert add_res.status_code == 201
    assert add_res.json()["id"] == "p3"
    assert add_res.json()["n"] == "Pain au Chocolat"

    # Verify project has 3 products now
    proj_res = client.get(f"/api/projects/{project_id}")
    assert len(proj_res.json()["products"]) == 3


def test_add_duplicate_product_id_returns_409(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    # Try to add p1 again
    dup_prod = {
        "id": "p1",
        "n": "Another Croissant",
        "p": "120",
    }
    res = client.post(f"/api/projects/{project_id}/products", json=dup_prod)
    assert res.status_code == 409


def test_update_product(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    update_payload = {
        "n": "Artisan Butter Croissant Deluxe",
        "p": "135",
        "op": "160",
        "c": "Pastries",
        "e": "🥐",
        "d": "Award winning pastry",
        "x": "Best Seller",
        "f": True,
        "rating": 5.0,
    }
    update_res = client.put(
        f"/api/projects/{project_id}/products/p1", json=update_payload
    )
    assert update_res.status_code == 200
    assert update_res.json()["n"] == "Artisan Butter Croissant Deluxe"
    assert update_res.json()["p"] == "135"


def test_delete_product(client):
    create_res = client.post("/api/projects", json=SAMPLE_STATE_PAYLOAD)
    project_id = create_res.json()["id"]

    del_res = client.delete(f"/api/projects/{project_id}/products/p1")
    assert del_res.status_code == 204

    # Verify 1 product remains
    proj_res = client.get(f"/api/projects/{project_id}")
    assert len(proj_res.json()["products"]) == 1
    assert proj_res.json()["products"][0]["id"] == "p2"


# ============================================================================
# 4. Static frontend serving test
# ============================================================================

def test_static_frontend_served(client):
    response = client.get("/")
    assert response.status_code == 200
    assert "CatalogCraft" in response.text
