 // Emission factors (kg CO2 per unit)
        const emissionFactors = {
            flight: {
                'economy': 0.255,
                'premium-economy': 0.382,
                'business': 0.739,
                'first': 1.019
            },
            car: {
                'petrol-small': 0.142,
                'petrol-medium': 0.171,
                'petrol-large': 0.209,
                'diesel-small': 0.134,
                'diesel-medium': 0.162,
                'diesel-large': 0.197,
                'hybrid': 0.106,
                'electric': 0.053
            },
            accommodation: {
                'hotel-luxury': 33.4,
                'hotel-standard': 20.6,
                'hotel-budget': 10.2,
                'hostel': 5.1,
                'airbnb': 15.3,
                'eco-hotel': 8.2,
                'camping': 2.1
            }
        };

        // Range slider value displays
        const flightDistanceSlider = document.getElementById('flightDistance');
        const flightDistanceValue = document.getElementById('flightDistanceValue');
        
        const carDistanceSlider = document.getElementById('carDistance');
        const carDistanceValue = document.getElementById('carDistanceValue');
        
        const nightsSlider = document.getElementById('nights');
        const nightsValue = document.getElementById('nightsValue');

        // Update range slider displays
        flightDistanceSlider.addEventListener('input', function() {
            flightDistanceValue.textContent = this.value.toLocaleString() + ' km';
        });

        carDistanceSlider.addEventListener('input', function() {
            carDistanceValue.textContent = this.value.toLocaleString() + ' km';
        });

        nightsSlider.addEventListener('input', function() {
            nightsValue.textContent = this.value + (this.value === '1' ? ' night' : ' nights');
        });

        // Calculate emissions
        document.getElementById('calculateBtn').addEventListener('click', function() {
            // Get active tab
            const activeTab = document.querySelector('.nav-tabs .nav-link.active').getAttribute('id');
            let totalEmissions = 0;
            let breakdownItems = [];

            if (activeTab === 'flight-tab') {
                const flightClass = document.getElementById('flightClass').value;
                const distance = parseInt(document.getElementById('flightDistance').value);
                const passengers = parseInt(document.getElementById('flightPassengers').value);
                const roundTrip = document.getElementById('roundTrip').checked;

                if (flightClass && distance > 0) {
                    let emissions = emissionFactors.flight[flightClass] * distance * passengers;
                    if (roundTrip) emissions *= 2;
                    totalEmissions = emissions;
                    
                    breakdownItems.push({
                        label: 'Flight (' + flightClass.replace('-', ' ') + ')',
                        value: emissions.toFixed(1) + ' kg CO2'
                    });
                    breakdownItems.push({
                        label: 'Distance',
                        value: distance.toLocaleString() + ' km' + (roundTrip ? ' (round trip)' : '')
                    });
                    breakdownItems.push({
                        label: 'Passengers',
                        value: passengers
                    });
                }
            } else if (activeTab === 'car-tab') {
                const carType = document.getElementById('carType').value;
                const distance = parseInt(document.getElementById('carDistance').value);
                const passengers = parseInt(document.getElementById('carPassengers').value);

                if (carType && distance > 0) {
                    // Per-person emissions (total emissions divided by passengers)
                    let emissions = emissionFactors.car[carType] * distance;
                    let perPersonEmissions = emissions / passengers;
                    totalEmissions = emissions;
                    
                    breakdownItems.push({
                        label: 'Vehicle (' + carType.replace(/-/g, ' ') + ')',
                        value: emissions.toFixed(1) + ' kg CO2'
                    });
                    breakdownItems.push({
                        label: 'Per passenger',
                        value: perPersonEmissions.toFixed(1) + ' kg CO2'
                    });
                    breakdownItems.push({
                        label: 'Distance',
                        value: distance.toLocaleString() + ' km'
                    });
                }
            } else if (activeTab === 'accommodation-tab') {
                const accommodationType = document.getElementById('accommodationType').value;
                const nights = parseInt(document.getElementById('nights').value);
                const rooms = parseInt(document.getElementById('rooms').value);

                if (accommodationType && nights > 0) {
                    let emissions = emissionFactors.accommodation[accommodationType] * nights * rooms;
                    totalEmissions = emissions;
                    
                    breakdownItems.push({
                        label: 'Accommodation (' + accommodationType.replace(/-/g, ' ') + ')',
                        value: emissions.toFixed(1) + ' kg CO2'
                    });
                    breakdownItems.push({
                        label: 'Duration',
                        value: nights + (nights === 1 ? ' night' : ' nights')
                    });
                    breakdownItems.push({
                        label: 'Rooms',
                        value: rooms
                    });
                }
            }

            // Display results
            if (totalEmissions > 0) {
                document.getElementById('emptyState').classList.add('d-none');
                document.getElementById('resultsDisplay').classList.remove('d-none');
                document.getElementById('totalEmissions').textContent = totalEmissions.toFixed(1);

                // Store emissions for offset page
                localStorage.setItem('carbonEmissions', totalEmissions);
                
                // Update offset button link with emissions parameter
                document.getElementById('exploreOffsetBtn').href = 'offset-options.html?emissions=' + totalEmissions.toFixed(1);

                // Build breakdown list
                const breakdownList = document.getElementById('breakdownList');
                breakdownList.innerHTML = '';
                breakdownItems.forEach(function(item) {
                    const div = document.createElement('div');
                    div.className = 'breakdown-item';
                    div.innerHTML = '<span>' + item.label + '</span><span class="fw-semibold">' + item.value + '</span>';
                    breakdownList.appendChild(div);
                });
            } else {
                alert('Please fill in all required fields to calculate emissions.');
            }
        });