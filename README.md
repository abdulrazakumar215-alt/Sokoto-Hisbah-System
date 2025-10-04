# Sokoto-Hisbah-System
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hisbah Q3 2025 Performance Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        .nav-btn.active {
            background-color: #059669; /* emerald-600 */
            color: white;
            font-weight: 600;
        }
        .content-section {
            display: none;
            animation: fadeIn 0.5s ease-in-out;
        }
        .content-section.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .chart-container {
            position: relative;
            width: 100%;
            height: 350px;
            max-height: 40vh;
        }
        @media (max-width: 768px) {
            .chart-container {
                height: 300px;
            }
        }
    </style>
</head>
<body class="bg-slate-100 text-slate-800">
    <!-- Chosen Palette: Professional Green & Slate -->
    <!-- Application Structure Plan: The SPA is designed as an interactive, tab-based dashboard to provide a non-linear way to explore the Q3 performance report. The structure includes four main sections: 'Dashboard Overview', 'Report Analysis', 'Officer Feedback', and 'Recommendations'. This tabbed approach was chosen to allow leadership to quickly access high-level KPIs, drill down into specific data points (like categories or trends), and review qualitative insights without overwhelming them with a long, scrolling document. The user flow is from a summary (Dashboard) to details (Analysis) to human factors (Feedback) and finally to future actions (Recommendations), creating a logical and user-friendly narrative. -->
    <!-- Visualization & Content Choices: 
        - Report KPIs (Table) -> Goal: Inform -> Viz: Prominent Stat Cards (HTML/CSS) -> Interaction: None -> Justification: Provides at-a-glance understanding of key metrics.
        - Monthly KPI Data (Table) -> Goal: Show Change/Trend -> Viz: Line Chart (Chart.js) -> Interaction: Hover tooltips -> Justification: Effectively visualizes the operational tempo and verification efficiency over the quarter.
        - Report Categories (List) -> Goal: Show Proportions -> Viz: Donut Chart (Chart.js) -> Interaction: Hover tooltips -> Justification: Offers an immediate, clear visual breakdown of incident types, which is more impactful than a list.
        - Geographic Hotspots (List) -> Goal: Compare -> Viz: Styled Bar Cards (HTML/CSS) -> Interaction: None -> Justification: Creates a simple, scannable comparison of report volumes by zone without the complexity of a full bar chart.
        - Officer Feedback & Recommendations (Text) -> Goal: Inform/Organize -> Viz: Themed Cards (HTML/CSS) -> Interaction: None -> Justification: Organizes qualitative information into distinct, readable blocks, separating positive points, challenges, and actionable steps.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

    <div class="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">

        <header class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Sokoto Hisbah Intelligence Unit</h1>
            <p class="text-xl text-emerald-700 font-semibold">Q3 2025 Performance Dashboard</p>
        </header>

        <!-- Navigation -->
        <div class="flex justify-center mb-8">
            <div class="flex flex-wrap justify-center space-x-2 bg-slate-200 p-1.5 rounded-full shadow-sm">
                <button data-target="dashboard" class="nav-btn active px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-medium rounded-full transition">Overview</button>
                <button data-target="analysis" class="nav-btn px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-medium rounded-full transition">Report Analysis</button>
                <button data-target="feedback" class="nav-btn px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-medium rounded-full transition">Officer Feedback</button>
                <button data-target="recommendations" class="nav-btn px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-medium rounded-full transition">Recommendations</button>
            </div>
        </div>

        <main id="content-container">
            <!-- Dashboard Overview Section -->
            <section id="dashboard" class="content-section active">
                <div class="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 class="text-2xl font-bold text-slate-800 mb-1">Executive Summary</h2>
                    <p class="text-slate-600">This dashboard provides a comprehensive overview of the Intelligence Unit's operations for Q3 2025 (July 1 - Sep 30). The new digital system has significantly increased operational tempo and data-driven interventions. Key findings indicate a high volume of reports related to substance abuse. While efficiency has improved, challenges remain in evidence verification and inter-agency collaboration.</p>
                </div>

                <!-- Key Metrics -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                        <p class="text-sm font-medium text-slate-500">Total Reports</p>
                        <p class="text-4xl font-extrabold text-emerald-600 mt-1">165</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                        <p class="text-sm font-medium text-slate-500">Actionable Reports</p>
                        <p class="text-4xl font-extrabold text-emerald-600 mt-1">118</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                        <p class="text-sm font-medium text-slate-500">Successful Interventions</p>
                        <p class="text-4xl font-extrabold text-emerald-600 mt-1">64</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                        <p class="text-sm font-medium text-slate-500">Avg. Verification Time</p>
                        <p class="text-4xl font-extrabold text-emerald-600 mt-1">3.5 <span class="text-2xl">days</span></p>
                    </div>
                </div>

                <!-- Monthly Performance Chart -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-bold text-slate-800 mb-4">Monthly Performance Trends: Q3 2025</h2>
                    <div class="chart-container">
                        <canvas id="monthlyPerformanceChart"></canvas>
                    </div>
                </div>
            </section>

            <!-- Report Analysis Section -->
            <section id="analysis" class="content-section">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                         <h2 class="text-xl font-bold text-slate-800 mb-4">Report Categories Breakdown</h2>
                         <div class="chart-container mx-auto" style="max-width: 350px;">
                            <canvas id="reportCategoriesChart"></canvas>
                        </div>
                    </div>
                    <div class="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                        <h2 class="text-xl font-bold text-slate-800 mb-4">Geographic Distribution Hotspots</h2>
                        <p class="text-slate-600 mb-6">Reports are concentrated in key zones, with distinct patterns emerging in each area.</p>
                        <div class="space-y-4">
                            <div class="p-4 border rounded-lg">
                                <div class="flex justify-between items-center mb-1">
                                    <h3 class="font-bold text-slate-700">1. Sokoto Metropolis (Zone A)</h3>
                                    <span class="font-extrabold text-emerald-600 text-lg">95 Reports</span>
                                </div>
                                <p class="text-sm text-slate-500 mb-2">Main Issues: Substance abuse & indecent behavior.</p>
                                <div class="w-full bg-slate-200 rounded-full h-2.5">
                                    <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 58%"></div>
                                </div>
                            </div>
                            <div class="p-4 border rounded-lg">
                                <div class="flex justify-between items-center mb-1">
                                    <h3 class="font-bold text-slate-700">2. Wurno LGA (Zone B)</h3>
                                    <span class="font-extrabold text-emerald-600 text-lg">42 Reports</span>
                                </div>
                                <p class="text-sm text-slate-500 mb-2">Main Issues: Theft & marital disputes.</p>
                                <div class="w-full bg-slate-200 rounded-full h-2.5">
                                    <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 25%"></div>
                                </div>
                            </div>
                            <div class="p-4 border rounded-lg">
                                <div class="flex justify-between items-center mb-1">
                                    <h3 class="font-bold text-slate-700">3. Goronyo LGA (Zone C)</h3>
                                    <span class="font-extrabold text-emerald-600 text-lg">28 Reports</span>
                                </div>
                                <p class="text-sm text-slate-500 mb-2">Main Issues: Mix of all categories.</p>
                                <div class="w-full bg-slate-200 rounded-full h-2.5">
                                    <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 17%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Officer Feedback Section -->
            <section id="feedback" class="content-section">
                <h2 class="text-2xl font-bold text-slate-800 text-center mb-6">Qualitative Insights & Officer Feedback</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold text-green-600 mb-4">Positive Feedback ✅</h3>
                        <ul class="space-y-4 list-inside">
                            <li class="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 text-green-800">"The new digital system is faster and more secure than paper."</li>
                            <li class="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 text-green-800">"Being able to submit reports instantly from the field is a game-changer."</li>
                            <li class="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 text-green-800">"The LLM Report Assistant helps structure my thoughts professionally."</li>
                        </ul>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold text-amber-600 mb-4">Challenges Identified ⚠️</h3>
                        <ul class="space-y-4 list-inside">
                            <li class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 text-amber-800">"Getting clear video/photo evidence without being detected is the hardest part."</li>
                            <li class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 text-amber-800">"Sometimes, getting a second source to verify a claim takes too long, and the opportunity is lost."</li>
                            <li class="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 text-amber-800">"We need a faster way to coordinate with the Police or NDLEA for joint operations."</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Recommendations Section -->
            <section id="recommendations" class="content-section">
                 <h2 class="text-2xl font-bold text-slate-800 text-center mb-6">Strategic Recommendations</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
                        <h3 class="text-lg font-bold text-slate-800 mb-2">1. Specialized Training</h3>
                        <p class="text-slate-600">Provide advanced training for officers on covert evidence gathering techniques, including the use of discreet recording equipment.</p>
                    </div>
                     <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
                        <h3 class="text-lg font-bold text-slate-800 mb-2">2. Rapid Verification Protocol</h3>
                        <p class="text-slate-600">Establish a rapid verification protocol, potentially creating a dedicated 2-person team to fast-track high-priority intelligence.</p>
                    </div>
                     <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
                        <h3 class="text-lg font-bold text-slate-800 mb-2">3. Technology Integration</h3>
                        <p class="text-slate-600">Develop a secure, simplified communication channel (liaison portal) for sharing actionable intelligence with partner agencies.</p>
                    </div>
                     <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-emerald-500">
                        <h3 class="text-lg font-bold text-slate-800 mb-2">4. Community Engagement</h3>
                        <p class="text-slate-600">Launch a public awareness campaign to encourage confidential reporting from community members through secure channels.</p>
                    </div>
                 </div>
            </section>

        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Data from the report
            const kpiData = {
                labels: ['July', 'August', 'September'],
                totalReports: [45, 62, 58],
                actionableReports: [32, 41, 45],
                successfulInterventions: [15, 21, 28]
            };

            const categoryData = {
                labels: [
                    'Substance Abuse', 
                    'Indecent Behavior', 
                    'Theft & Fraud', 
                    'Marital Disputes', 
                    'Blasphemy/Heresy', 
                    'Other'
                ],
                data: [78, 35, 22, 18, 5, 7],
                percentages: [47.3, 21.2, 13.3, 10.9, 3.0, 4.2]
            };

            // Chart Configurations
            const monthlyPerformanceConfig = {
                type: 'line',
                data: {
                    labels: kpiData.labels,
                    datasets: [{
                        label: 'Total Reports Submitted',
                        data: kpiData.totalReports,
                        borderColor: '#059669', // emerald-600
                        backgroundColor: 'rgba(5, 150, 105, 0.1)',
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Reports Verified & Actionable',
                        data: kpiData.actionableReports,
                        borderColor: '#0f766e', // teal-700
                        backgroundColor: 'rgba(15, 118, 110, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    }
                }
            };
            
            const reportCategoriesConfig = {
                type: 'doughnut',
                data: {
                    labels: categoryData.labels,
                    datasets: [{
                        label: 'Reports by Category',
                        data: categoryData.data,
                        backgroundColor: [
                            '#059669', // Emerald
                            '#0d9488', // Teal
                            '#0891b2', // Cyan
                            '#0284c7', // Sky
                            '#2563eb', // Blue
                            '#64748b'  // Slate
                        ],
                        hoverOffset: 4
                    }]
                },
                 options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                             callbacks: {
                                label: function(context) {
                                    const index = context.dataIndex;
                                    const label = context.chart.data.labels[index] || '';
                                    const value = context.parsed;
                                    const percentage = categoryData.percentages[index];
                                    return `${label}: ${value} reports (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            };

            // Navigation Logic
            const navButtons = document.querySelectorAll('.nav-btn');
            const contentSections = document.querySelectorAll('.content-section');
            let performanceChart, categoriesChart;

            function showSection(targetId) {
                navButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.target === targetId);
                });
                contentSections.forEach(section => {
                    section.classList.toggle('active', section.id === targetId);
                });

                // Lazy load charts
                if (targetId === 'dashboard' && !performanceChart) {
                    const ctx = document.getElementById('monthlyPerformanceChart').getContext('2d');
                    performanceChart = new Chart(ctx, monthlyPerformanceConfig);
                }
                if (targetId === 'analysis' && !categoriesChart) {
                    const ctx = document.getElementById('reportCategoriesChart').getContext('2d');
                    categoriesChart = new Chart(ctx, reportCategoriesConfig);
                }
            }

            navButtons.forEach(button => {
                button.addEventListener('click', () => {
                    showSection(button.dataset.target);
                });
            });

            // Show default section
            showSection('dashboard');
        });
    </script>
</body>
</html>
