document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // EMISSION FACTORS
    // =========================
    const emissionFactors = {
        flight: {
            economy: 0.255,
            "premium-economy": 0.382,
            business: 0.739,
            first: 1.019
        },
        car: {
            "petrol-small": 0.142,
            "petrol-medium": 0.171,
            "petrol-large": 0.209,
            "diesel-small": 0.134,
            "diesel-medium": 0.162,
            "diesel-large": 0.197,
            hybrid: 0.106,
            electric: 0.053
        },
        accommodation: {
            "hotel-luxury": 33.4,
            "hotel-standard": 20.6,
            "hotel-budget": 10.2,
            hostel: 5.1,
            airbnb: 15.3,
            "eco-hotel": 8.2,
            camping: 2.1
        }
    };

    // =========================
    // SLIDERS
    // =========================
    const flightDistance = document.getElementById("flightDistance");
    const carDistance = document.getElementById("carDistance");
    const nights = document.getElementById("nights");

    const flightDistanceValue = document.getElementById("flightDistanceValue");
    const carDistanceValue = document.getElementById("carDistanceValue");
    const nightsValue = document.getElementById("nightsValue");

    if (flightDistance) {
        flightDistance.addEventListener("input", function () {
            flightDistanceValue.textContent = this.value + " km";
        });
    }

    if (carDistance) {
        carDistance.addEventListener("input", function () {
            carDistanceValue.textContent = this.value + " km";
        });
    }

    if (nights) {
        nights.addEventListener("input", function () {
            nightsValue.textContent = this.value + (this.value == 1 ? " night" : " nights");
        });
    }

    // =========================
    // CALCULATE BUTTON
    // =========================
    const calculateBtn = document.getElementById("calculateBtn");

    calculateBtn.addEventListener("click", function () {

        const activeTab = document.querySelector(".nav-tabs .nav-link.active").getAttribute("data-bs-target");

        let totalEmissions = 0;
        let breakdown = [];

        // =========================
        // FLIGHT
        // =========================
        if (activeTab === "#flight") {

            const type = document.getElementById("flightClass").value;
            const distance = Number(document.getElementById("flightDistance").value);
            const passengers = Number(document.getElementById("flightPassengers").value);
            const roundTrip = document.getElementById("roundTrip")?.checked;

            if (type && distance > 0 && passengers > 0) {

                let emissions = emissionFactors.flight[type] * distance * passengers;

                if (roundTrip) emissions *= 2;

                totalEmissions = emissions;

                breakdown.push(
                    { label: "Flight Type", value: type },
                    { label: "Distance", value: distance + " km" },
                    { label: "Passengers", value: passengers },
                    { label: "Round Trip", value: roundTrip ? "Yes" : "No" }
                );
            }
        }

        // =========================
        // CAR
        // =========================
        else if (activeTab === "#car") {

            const type = document.getElementById("carType").value;
            const distance = Number(document.getElementById("carDistance").value);
            const passengers = Number(document.getElementById("carPassengers").value);

            if (type && distance > 0 && passengers > 0) {

                const total = emissionFactors.car[type] * distance;
                const perPerson = total / passengers;

                totalEmissions = total;

                breakdown.push(
                    { label: "Vehicle", value: type },
                    { label: "Distance", value: distance + " km" },
                    { label: "Per Passenger", value: perPerson.toFixed(2) + " kg CO₂" }
                );
            }
        }

        // =========================
        // ACCOMMODATION
        // =========================
       else if (activeTab === "#accommodation") {

            const type = document.getElementById("accommodationType").value;
            const nights = Number(document.getElementById("nights").value);
            const rooms = Number(document.getElementById("rooms").value);

            if (type && nights > 0 && rooms > 0) {

                const emissions = emissionFactors.accommodation[type] * nights * rooms;

                totalEmissions = emissions;

                breakdown.push(
                    { label: "Stay Type", value: type },
                    { label: "Nights", value: nights },
                    { label: "Rooms", value: rooms }
                );
            }
        }

        // =========================
        // DISPLAY RESULT
        // =========================
        if (totalEmissions > 0) {

            document.getElementById("emptyState").classList.add("d-none");
            document.getElementById("resultsDisplay").classList.remove("d-none");

            document.getElementById("totalEmissions").textContent =
                totalEmissions.toFixed(1);

            localStorage.setItem("carbonEmissions", totalEmissions);

            document.getElementById("exploreOffsetBtn").href =
                "offset-options.html?emissions=" + totalEmissions.toFixed(1);

            const list = document.getElementById("breakdownList");
            list.innerHTML = "";

            breakdown.forEach(item => {
                const div = document.createElement("div");
                div.className = "d-flex justify-content-between border-bottom py-2";
                div.innerHTML = `
                    <span>${item.label}</span>
                    <span class="fw-semibold">${item.value}</span>
                `;
                list.appendChild(div);
            });

        } else {
            alert("Please fill in all required fields.");
        }
    });

});