<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hisbah Intelligence Quick Start Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .role-btn.active {
            background-color: #059669; /* Emerald 600 */
            color: white;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(5, 150, 105, 0.3);
        }
        .content-section {
            display: none;
            animation: fadeIn 0.6s ease-in-out;
        }
        .content-section.active {
            display: block;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .checklist-item.checked {
            text-decoration: line-through;
            color: #475569; /* Slate 600 */
        }
        .checklist-item.checked .checklist-icon {
            background-color: #10b981; /* Emerald 500 */
            border-color: #10b981;
        }
        .checklist-item.checked .checklist-icon svg {
            display: block;
        }
        #notification-box {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            transform: translateY(-100px);
            opacity: 0;
            max-width: 90%;
        }
        #notification-box.show {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800">
    <!-- Chosen Palette: Calm Neutrals & Green -->
    <!-- Application Structure Plan: The SPA is structured as a task-oriented "Quick Start Guide" with two primary views controlled by a role selector: one for the "Admin" and one for the "Intelligence Officer." This structure was chosen to separate concerns and provide each user type with only the information relevant to their immediate tasks, making the plan more actionable and easier to navigate than a linear document. The Admin view features an interactive checklist for initial setup, while the Officer view uses clear, distinct cards for their operational rules and centers around the LLM-powered Report Detail Expander tool. This design prioritizes usability and quick access to role-specific instructions. -->
    <!-- Visualization & Content Choices: The source report contains procedural text and tables, with no quantitative data suitable for charting. Therefore, all content is presented using structured HTML. The 'Admin Steps' are an interactive checklist (HTML/CSS/JS) to track progress. The 'Officer Rules' are redesigned into a set of distinct, easily digestible cards (HTML/Tailwind). The core interactive feature is the LLM-powered "Report Detail Expander," which generates professional text and includes a copy-to-clipboard utility. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

    <!-- Custom Notification Box (Replaces alert()) -->
    <div id="notification-box" class="bg-red-500 text-white p-4 rounded-lg shadow-xl font-semibold">
        <!-- Message will be inserted here -->
    </div>

    <div class="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">

        <header class="text-center mb-10">
            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Hisbah Intelligence Quick Start Guide</h1>
            <p class="text-lg text-emerald-700 font-semibold">Initial Steps for Admin and Officers</p>
        </header>

        <p class="text-center bg-white border-l-4 border-emerald-500 p-4 rounded-r-lg shadow-sm mb-10 text-slate-600">
            This page guides you through the steps to begin operations. Select your role below to see the actions relevant to you.
        </p>

        <!-- Role Selector -->
        <div class="flex justify-center mb-12">
            <div class="flex space-x-2 bg-slate-200 p-1.5 rounded-full">
                <button id="admin-btn" class="role-btn active px-6 py-2.5 text-sm font-medium rounded-full transition shadow-md">
                    Admin Guide
                </button>
                <button id="officer-btn" class="role-btn px-6 py-2.5 text-sm font-medium rounded-full transition">
                    Intelligence Officer Guide
                </button>
            </div>
        </div>

        <main id="content-container">
            <!-- Admin Section -->
            <section id="admin-section" class="content-section active space-y-8">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-emerald-200 pb-2 flex items-center">
                        <span class="mr-2">⚙️</span> Initial Steps for the Admin
                    </h2>
                    <p class="text-slate-600 mb-6">As the Head of the Board (Admin), follow these immediate steps to start operating this new unit within the App. Click each task when you complete it.</p>
                    
                    <div id="admin-checklist" class="space-y-4">
                        <div class="checklist-item flex items-start p-4 bg-white rounded-lg shadow-sm cursor-pointer border border-slate-200 hover:border-emerald-300 transition">
                            <div class="checklist-icon h-6 w-6 rounded-full border-2 border-slate-300 mr-4 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg class="h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">1. Log in as Admin</h3>
                                <p class="text-slate-600 text-sm">Use the default login credentials: <br>
                                <span class="font-mono bg-slate-100 px-2 py-1 rounded text-emerald-800 text-xs">Email: admin@sokotohisbah.org</span> <br>
                                <span class="font-mono bg-slate-100 px-2 py-1 rounded text-emerald-800 text-xs">Password: Hisbah2025</span></p>
                            </div>
                        </div>

                        <div class="checklist-item flex items-start p-4 bg-white rounded-lg shadow-sm cursor-pointer border border-slate-200 hover:border-emerald-300 transition">
                            <div class="checklist-icon h-6 w-6 rounded-full border-2 border-slate-300 mr-4 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg class="h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">2. Access the Registration Section</h3>
                                <p class="text-slate-600 text-sm">After logging in, navigate to the **Registration** section in your Dashboard.</p>
                            </div>
                        </div>

                        <div class="checklist-item flex items-start p-4 bg-white rounded-lg shadow-sm cursor-pointer border border-slate-200 hover:border-emerald-300 transition">
                            <div class="checklist-icon h-6 w-6 rounded-full border-2 border-slate-300 mr-4 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg class="h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">3. Create Intelligence Personnel</h3>
                                <p class="text-slate-600 text-sm">Register the selected officers. In the **"Role"** field, you must select **"Hisbah Personnel (Intelligence Unit)"**.</p>
                            </div>
                        </div>

                        <div class="checklist-item flex items-start p-4 bg-white rounded-lg shadow-sm cursor-pointer border border-slate-200 hover:border-emerald-300 transition">
                            <div class="checklist-icon h-6 w-6 rounded-full border-2 border-slate-300 mr-4 flex items-center justify-center flex-shrink-0 mt-1">
                                <svg class="h-4 w-4 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">4. Train Officers</h3>
                                <p class="text-slate-600 text-sm">Provide all officers with the **Hisbah Main Operations Guide** document to read and understand all secrecy and operational rules.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-emerald-200 pb-2 flex items-center">
                        <span class="mr-2">💡</span> Final Recommendations
                    </h2>
                    <div class="space-y-4">
                        <div class="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 p-4 rounded-r-lg shadow-sm">
                            <h4 class="font-bold">Share Login Credentials</h4>
                            <p class="mt-1 text-sm">Ensure that the login credentials (Email/Password) for each Intelligence Officer are shared in a confidential manner.</p>
                        </div>
                        <div class="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 p-4 rounded-r-lg shadow-sm">
                            <h4 class="font-bold">Equipment Provision</h4>
                            <p class="mt-1 text-sm">Provide high-quality mobile phones with good cameras to each officer for evidence gathering.</p>
                        </div>
                        <div class="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 p-4 rounded-r-lg shadow-sm">
                            <h4 class="font-bold">Compliance Monitoring</h4>
                            <p class="mt-1 text-sm">Once a month, the Unit Head must review all submitted reports to ensure Hisbah regulations are being followed.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Officer Section -->
            <section id="officer-section" class="content-section space-y-8">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-emerald-200 pb-2 flex items-center">
                        <span class="mr-2">🛡️</span> Intelligence Officer Rules (Quick Reference)
                    </h2>
                    <p class="text-slate-600 mb-6">As a new Intelligence Officer, these are the key actions you will perform after being assigned your role in the App.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 class="text-lg font-bold text-emerald-700 mb-2">Login</h3>
                            <p class="text-slate-600 mb-3 text-sm">You will log directly into the **Intelligence Dashboard** (The Red/Black Dashboard).</p>
                            <div class="bg-slate-100 p-3 rounded-md text-xs">
                                <h4 class="font-semibold text-slate-800">Secrecy Importance:</h4>
                                <p class="text-slate-600 mt-1">Ensure a strong Password is used on your phone.</p>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 class="text-lg font-bold text-emerald-700 mb-2">Sending Reports</h3>
                            <p class="text-slate-600 mb-3 text-sm">Fill out the **Submit Confidential Report** Form found in your Dashboard.</p>
                             <div class="bg-slate-100 p-3 rounded-md text-xs">
                                <h4 class="font-semibold text-slate-800">Secrecy Importance:</h4>
                                <p class="text-slate-600 mt-1">**Never mention the sender's name** in the report description, only the intelligence details.</p>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 class="text-lg font-bold text-emerald-700 mb-2">Detail Entry</h3>
                            <p class="text-slate-600 mb-3 text-sm">Write a **Detailed Description** and clearly state the location of the problem.</p>
                             <div class="bg-slate-100 p-3 rounded-md text-xs">
                                <h4 class="font-semibold text-slate-800">Secrecy Importance:</h4>
                                <p class="text-slate-600 mt-1">The **Area/Location** must be clearly specified, as this serves as evidence of the operation.</p>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 class="text-lg font-bold text-emerald-700 mb-2">Review</h3>
                            <p class="text-slate-600 mb-3 text-sm">You can view all **Intelligence** Reports submitted by the Unit.</p>
                             <div class="bg-slate-100 p-3 rounded-md text-xs">
                                <h4 class="font-semibold text-slate-800">Secrecy Importance:</h4>
                                <p class="text-slate-600 mt-1">Do not share Intelligence report data with any Hisbah officer from the **General Unit**.</p>
                            </div>
                        </div>
                    </div>

                    <!-- LLM Feature Card - Report Detail Expander -->
                    <div class="bg-white p-6 rounded-lg shadow-xl border-t-4 border-emerald-500 mt-8">
                        <h3 class="text-xl font-bold text-emerald-800 mb-3 flex items-center">
                            <span class="mr-2">✍️</span> Report Detail Expander (AI Assistant)
                        </h3>
                        <p class="text-slate-600 mb-4 text-sm">Use this tool to quickly convert brief notes into a full, compliant **Detailed Description** for your report. Clarity and Location are key.</p>
                        <textarea id="brief-input" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" rows="4" placeholder="Enter brief notes, e.g., '3 men selling illegal goods near central mosque market on Monday evening.'"></textarea>
                        
                        <button id="generate-detail-btn" class="mt-4 w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center shadow-md">
                            <span id="btn-text">✨ Generate Detailed Report</span>
                            <span id="loading-spinner" class="hidden animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full ml-2"></span>
                        </button>
                        
                        <div id="output-container" class="mt-6 p-4 bg-slate-100 border border-slate-200 rounded-lg hidden">
                            <div class="flex justify-between items-center mb-2">
                                <h4 class="font-semibold text-slate-800">Generated Detailed Description:</h4>
                                <button id="copy-btn" class="text-xs text-emerald-600 font-semibold hover:text-emerald-800 transition py-1 px-3 bg-white rounded-full border border-emerald-200">
                                    📋 Copy Text
                                </button>
                            </div>
                            <div id="detailed-output" class="whitespace-pre-wrap text-slate-700 text-sm"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </div>

    <script>
        // API Configuration and Utility Functions
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // System prompt is in English to ensure the model understands the structuring task, but the output will be based on the context of the input (which is assumed to be Hausa/English related to Hisbah).
        const systemPrompt = "You are an intelligence report structuring assistant for the Hisbah. Your task is to take brief, raw field notes from a Hisbah officer and expand them into a formal, clear, and detailed operational report description. The output must be structured, professional, and explicitly highlight the *Location*, *Time*, *Subject*, and *Observed Action*. Do not include any conversational filler, greetings, or headings in the final output, just the report text. The tone must be factual and objective.";

        // --- Custom Notification Function (Replaces alert()) ---
        function showNotification(message, isError = true) {
            const box = document.getElementById('notification-box');
            box.textContent = message;
            box.className = isError 
                ? 'show bg-red-500 text-white p-4 rounded-lg shadow-xl font-semibold' 
                : 'show bg-emerald-500 text-white p-4 rounded-lg shadow-xl font-semibold';
            
            setTimeout(() => {
                box.classList.remove('show');
            }, 5000);
        }

        async function fetchWithRetry(url, options, retries = 3) {
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response;
                } catch (error) {
                    if (i === retries - 1) throw error;
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000)); 
                }
            }
        }

        async function handleGenerateDetail() {
            const inputElement = document.getElementById('brief-input');
            const outputContainer = document.getElementById('output-container');
            const outputElement = document.getElementById('detailed-output');
            const button = document.getElementById('generate-detail-btn');
            const buttonText = document.getElementById('btn-text');
            const spinner = document.getElementById('loading-spinner');

            const userQuery = inputElement.value.trim();

            if (!userQuery) {
                outputContainer.classList.add('hidden');
                showNotification("Please enter some brief notes to expand.", true);
                return;
            }

            // UI feedback: Loading state
            buttonText.textContent = 'Generating...';
            spinner.classList.remove('hidden');
            button.disabled = true;
            outputContainer.classList.add('hidden');
            outputElement.textContent = '';


            try {
                const payload = {
                    contents: [{ parts: [{ text: userQuery }] }],
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                };

                const response = await fetchWithRetry(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    outputElement.textContent = text;
                    outputContainer.classList.remove('hidden');
                    showNotification("Report details generated successfully!", false);
                } else {
                    outputElement.textContent = "Error: Could not generate detailed report. Please try again.";
                    outputContainer.classList.remove('hidden');
                    showNotification("Operation failed. Check the console for details.", true);
                }

            } catch (error) {
                console.error("Gemini API call failed:", error);
                outputElement.textContent = "Operation failed due to a network or API error. Check the console for details.";
                outputContainer.classList.remove('hidden');
                showNotification("A critical API error occurred.", true);
            } finally {
                // UI feedback: Reset state
                buttonText.textContent = '✨ Generate Detailed Report';
                spinner.classList.add('hidden');
                button.disabled = false;
            }
        }
        
        // --- Copy to Clipboard Function ---
        function copyToClipboard(elementId) {
            const textToCopy = document.getElementById(elementId).textContent;
            
            if (!textToCopy) {
                showNotification("No text to copy. Generate a report first.", true);
                return;
            }
            
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                showNotification("Report text copied successfully!", false);
            } catch (err) {
                showNotification("Failed to copy text. Please select and copy manually.", true);
            }
            
            document.body.removeChild(textarea);
        }


        document.addEventListener('DOMContentLoaded', () => {
            const adminBtn = document.getElementById('admin-btn');
            const officerBtn = document.getElementById('officer-btn');
            const adminSection = document.getElementById('admin-section');
            const officerSection = document.getElementById('officer-section');
            const adminChecklist = document.getElementById('admin-checklist');
            const generateDetailBtn = document.getElementById('generate-detail-btn');
            const copyBtn = document.getElementById('copy-btn');

            function showSection(sectionToShow) {
                if (sectionToShow === 'admin') {
                    adminSection.classList.add('active');
                    officerSection.classList.remove('active');
                    adminBtn.classList.add('active');
                    officerBtn.classList.remove('active');
                } else {
                    adminSection.classList.remove('active');
                    officerSection.classList.add('active');
                    adminBtn.classList.remove('active');
                    officerBtn.classList.add('active');
                }
            }

            adminBtn.addEventListener('click', () => showSection('admin'));
            officerBtn.addEventListener('click', () => showSection('officer'));

            adminChecklist.addEventListener('click', (e) => {
                const item = e.target.closest('.checklist-item');
                if (item) {
                    item.classList.toggle('checked');
                }
            });

            if (generateDetailBtn) {
                generateDetailBtn.addEventListener('click', handleGenerateDetail);
            }
            
            if (copyBtn) {
                copyBtn.addEventListener('click', () => copyToClipboard('detailed-output'));
            }
        });
    </script>
</body>
</html>
