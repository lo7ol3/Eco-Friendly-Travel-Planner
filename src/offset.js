 // Get emissions from URL or localStorage
        let totalEmissions = 0;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('emissions')) {
            totalEmissions = parseFloat(urlParams.get('emissions'));
        } else if (localStorage.getItem('carbonEmissions')) {
            totalEmissions = parseFloat(localStorage.getItem('carbonEmissions'));
        }

        // Update summary display
        document.getElementById('emissionsSummary').textContent = totalEmissions.toFixed(1);
        document.getElementById('treeEquivalent').textContent = Math.ceil(totalEmissions / 21); // Average tree absorbs ~21kg CO2/year
        document.getElementById('drivingEquivalent').textContent = Math.round(totalEmissions / 0.21).toLocaleString(); // ~0.21 kg CO2 per km

        // Project selection
        let selectedProject = null;

        function selectProject(card) {
            // Remove selection from all cards
            document.querySelectorAll('.offset-card').forEach(function(c) {
                c.classList.remove('selected');
            });

            // Select clicked card
            card.classList.add('selected');
            selectedProject = {
                project: card.dataset.project,
                price: parseFloat(card.dataset.price)
            };

            // Calculate and display cost
            const tonsCO2 = totalEmissions / 1000;
            const cost = (tonsCO2 * selectedProject.price).toFixed(2);
            
            document.getElementById('totalCost').textContent = '$' + cost;
            document.getElementById('purchaseBtn').disabled = false;
            document.getElementById('purchaseBtn').innerHTML = '<i class="bi bi-leaf"></i> Offset Now for $' + cost;
        }

        function completePurchase() {
            if (selectedProject) {
                const projectNames = {
                    'tree-planting': 'Rainforest Reforestation',
                    'wind-energy': 'Wind Farm Project',
                    'ocean-cleanup': 'Ocean Conservation',
                    'solar-energy': 'Community Solar Project',
                    'mangrove': 'Mangrove Restoration',
                    'cookstoves': 'Clean Cookstoves'
                };
                
                alert('Thank you for choosing to offset your carbon footprint!\n\nProject: ' + projectNames[selectedProject.project] + '\nEmissions: ' + totalEmissions.toFixed(1) + ' kg CO2\nOffset Cost: ' + document.getElementById('totalCost').textContent + '\n\nYou will be redirected to complete your purchase.');
            }
        }