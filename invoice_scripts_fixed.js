// Invoice Form JavaScript - Complete & Clean with Fixed Dropdown Positioning
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const itemsContainer = document.getElementById('invoice-items');
    const addItemBtn = document.getElementById('add-item-btn');
    const subtotalEl = document.getElementById('subtotal');
    const taxRateEl = document.getElementById('tax-rate');
    const grandTotalEl = document.getElementById('grand-total');
    const invoiceForm = document.getElementById('invoice-form');
    const submitBtn = document.getElementById('submit-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const statusMessage = document.getElementById('status-message');

    // Configuration
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Replace with your actual URL

    // Get service options from the HTML
    const getServiceOptions = () => {
        const serviceOptionsDiv = document.getElementById('service-options');
        if (!serviceOptionsDiv) {
            console.warn('Service options not found in HTML, using fallback array');
            return [
                'A. Audio Mixer', 'A. Cam Operator', 'A. Director', 'A. Producer',
                'B. Audio Mixer', 'B. Cam Operator', 'B. Director', 'B. Producer',
                'C. Craft Services', 'C. Meals - Per Diem', 'C. Hotels',
                'D. Location Rental', 'D. Drone Permit', 'D. Set Security',
                'E. Prop Rental', 'E. Prop Purchase', 'E. Prop Fabrication',
                'M. Editor', 'M. Graphic Designer', 'M. Animator (2D)',
                'O. Art Director', 'O. Copywriter', 'O. Creative Director'
            ];
        }
        
        const options = [];
        const optionElements = serviceOptionsDiv.querySelectorAll('option');
        optionElements.forEach(option => {
            if (option.textContent.trim()) {
                options.push(option.textContent.trim());
            }
        });
        return options;
    };

    const serviceOptions = getServiceOptions();

    // Initialize default dates
    const initializeDates = () => {
        const today = new Date();
        const isoDate = today.toISOString().split('T')[0];
        
        const invoiceDateEl = document.getElementById('invoice-date');
        const serviceStartEl = document.getElementById('service-start');
        const serviceEndEl = document.getElementById('service-end');
        
        if (invoiceDateEl) invoiceDateEl.value = isoDate;
        if (serviceStartEl) serviceStartEl.value = isoDate;
        if (serviceEndEl) serviceEndEl.value = isoDate;
    };

    // Create searchable dropdown with proper positioning
    const createSearchableDropdown = (container) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'searchable-dropdown';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type to search services...';
        input.className = 'table-input service-input';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-list';
        dropdown.style.display = 'none';
        
        let selectedValue = '';
        let isOpen = false;
        
        const filterOptions = (searchTerm) => {
            dropdown.innerHTML = '';
            
            let filteredOptions;
            if (!searchTerm.trim()) {
                // Show first 15 options when empty to prevent overwhelming UI
                filteredOptions = serviceOptions.slice(0, 15);
            } else {
                // Filter options based on search term
                filteredOptions = serviceOptions.filter(option => 
                    option.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            if (filteredOptions.length === 0) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'dropdown-item';
                noResultsDiv.style.fontStyle = 'italic';
                noResultsDiv.style.color = '#6b7280';
                noResultsDiv.textContent = 'No services found';
                dropdown.appendChild(noResultsDiv);
            } else {
                // Limit to first 20 results for performance
                filteredOptions.slice(0, 20).forEach(option => {
                    addDropdownItem(option);
                });
                
                if (filteredOptions.length > 20) {
                    const moreDiv = document.createElement('div');
                    moreDiv.className = 'dropdown-item';
                    moreDiv.style.fontStyle = 'italic';
                    moreDiv.style.color = '#6b7280';
                    moreDiv.textContent = `... and ${filteredOptions.length - 20} more results`;
                    dropdown.appendChild(moreDiv);
                }
            }
        };
        
        const addDropdownItem = (option) => {
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            div.textContent = option;
            
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                input.value = option;
                selectedValue = option;
                input.dataset.selectedValue = option;
                closeDropdown();
                calculateTotals();
            });
            
            dropdown.appendChild(div);
        };
        
        const openDropdown = () => {
            if (!isOpen) {
                isOpen = true;
                
                // Remove dropdown-active class from all rows first
                document.querySelectorAll('.table-row').forEach(row => {
                    row.classList.remove('dropdown-active');
                });
                
                // Add dropdown-active class to current row
                const currentRow = wrapper.closest('.table-row');
                if (currentRow) {
                    currentRow.classList.add('dropdown-active');
                }
                
                dropdown.style.display = 'block';
                filterOptions(input.value);
            }
        };

        const closeDropdown = () => {
            isOpen = false;
            dropdown.style.display = 'none';
            
            // Remove dropdown-active class from current row
            const currentRow = wrapper.closest('.table-row');
            if (currentRow) {
                currentRow.classList.remove('dropdown-active');
            }
        };
        
        input.addEventListener('input', (e) => {
            if (!isOpen) openDropdown();
            filterOptions(e.target.value);
            
            // Clear selected value if input doesn't match exactly
            if (e.target.value !== selectedValue) {
                selectedValue = '';
                input.dataset.selectedValue = '';
            }
        });
        
        input.addEventListener('focus', () => {
            openDropdown();
        });
        
        input.addEventListener('blur', () => {
            // Delay closing to allow for clicks on dropdown items
            setTimeout(() => {
                closeDropdown();
            }, 150);
        });
        
        // Prevent input blur when clicking on dropdown
        dropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
        
        // Listen for scroll and resize events to reposition dropdown
        
        wrapper.appendChild(input);
        wrapper.appendChild(dropdown);
        container.appendChild(wrapper);
        
        return input;
    };

    // Create new item row
    const createItemRow = () => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        
        // Service/Item cell
        const serviceCell = document.createElement('td');
        serviceCell.className = 'table-cell';
        const serviceInput = createSearchableDropdown(serviceCell);
        
        // Job Code cell
        const jobCodeCell = document.createElement('td');
        jobCodeCell.className = 'table-cell';
        jobCodeCell.innerHTML = '<input type="text" placeholder="######" maxlength="6" class="table-input job-code" pattern="[0-9]{6}" title="Please enter a 6-digit job code">';
        
        // Quantity cell
        const quantityCell = document.createElement('td');
        quantityCell.className = 'table-cell';
        quantityCell.innerHTML = '<input type="number" placeholder="0" value="0" min="0" step="0.5" class="table-input quantity">';
        
        // Rate cell
        const rateCell = document.createElement('td');
        rateCell.className = 'table-cell';
        rateCell.innerHTML = '<input type="number" placeholder="0.00" min="0" step="0.01" class="table-input rate">';
        
        // Amount cell
        const amountCell = document.createElement('td');
        amountCell.className = 'table-cell amount-cell';
        amountCell.textContent = '$0.00';
        
        // Actions cell
        const actionsCell = document.createElement('td');
        actionsCell.className = 'table-cell no-print';
        actionsCell.innerHTML = `
            <div class="action-buttons">
                <button type="button" class="action-btn remove-btn remove-item-btn" title="Remove item">×</button>
                <button type="button" class="action-btn duplicate-btn duplicate-item-btn" title="Duplicate item">⧉</button>
            </div>
        `;
        
        row.appendChild(serviceCell);
        row.appendChild(jobCodeCell);
        row.appendChild(quantityCell);
        row.appendChild(rateCell);
        row.appendChild(amountCell);
        row.appendChild(actionsCell);
        
        // Add event listeners
        const jobCodeInput = row.querySelector('.job-code');
        jobCodeInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateJobCode(e.target);
        });

        const quantityInput = row.querySelector('.quantity');
        const rateInput = row.querySelector('.rate');
        
        quantityInput.addEventListener('input', calculateTotals);
        rateInput.addEventListener('input', calculateTotals);

        itemsContainer.appendChild(row);
        calculateTotals();
        
        return row;
    };

    // Duplicate item
    const duplicateItem = (originalRow) => {
        const newRow = createItemRow();
        
        // Get values from original row
        const originalServiceInput = originalRow.querySelector('.service-input');
        const originalJobCode = originalRow.querySelector('.job-code');
        const originalRate = originalRow.querySelector('.rate');
        
        if (originalServiceInput && originalServiceInput.dataset.selectedValue) {
            const newServiceInput = newRow.querySelector('.service-input');
            newServiceInput.value = originalServiceInput.value;
            newServiceInput.dataset.selectedValue = originalServiceInput.dataset.selectedValue;
        }
        
        if (originalJobCode && originalJobCode.value) {
            newRow.querySelector('.job-code').value = originalJobCode.value;
        }
        
        if (originalRate && originalRate.value) {
            newRow.querySelector('.rate').value = originalRate.value;
        }
        
        // Clear quantity in new row
        newRow.querySelector('.quantity').value = '0';
        
        calculateTotals();
    };

    // Validate job code
    const validateJobCode = (input) => {
        const value = input.value;
        if (value.length > 0 && value.length < 6) {
            input.classList.add('validation-error');
        } else {
            input.classList.remove('validation-error');
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        let subtotal = 0;
        
        document.querySelectorAll('.table-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
            const rate = parseFloat(row.querySelector('.rate').value) || 0;
            const amount = quantity * rate;
            
            row.querySelector('.amount-cell').textContent = `$${amount.toFixed(2)}`;
            subtotal += amount;
        });

        const taxRate = parseFloat(taxRateEl.value) || 0;
        const taxAmount = subtotal * (taxRate / 100);
        const grandTotal = subtotal + taxAmount;

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
    };

    // Form validation
    const validateForm = () => {
        const requiredFields = [
            'cost-center', 'vendor-name', 'vendor-email', 'client-name', 
            'hiring-manager', 'hiring-manager-email', 'invoice-number', 
            'invoice-date', 'pay-terms', 'service-start', 'service-end'
        ];
        
        let isValid = true;
        const errors = [];
        
        // Check required fields
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                if (field) field.classList.add('validation-error');
                errors.push(`${fieldId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`);
                isValid = false;
            } else {
                field.classList.remove('validation-error');
            }
        });

        // Check email format
        const emailFields = ['vendor-email', 'hiring-manager-email'];
        emailFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && field.value && !isValidEmail(field.value)) {
                field.classList.add('validation-error');
                errors.push(`Please enter a valid email for ${fieldId.replace('-', ' ')}`);
                isValid = false;
            }
        });

        // Check if at least one item exists with a selected service
        const validItems = Array.from(document.querySelectorAll('.service-input'))
            .filter(input => input.dataset.selectedValue);
        
        if (validItems.length === 0) {
            errors.push('Please add at least one invoice item with a selected service');
            isValid = false;
        }

        // Check job codes
        const jobCodes = document.querySelectorAll('.job-code');
        jobCodes.forEach(input => {
            if (input.value && input.value.length !== 6) {
                input.classList.add('validation-error');
                errors.push('Job codes must be exactly 6 digits');
                isValid = false;
            }
        });

        if (!isValid) {
            showStatusMessage(errors[0], 'error');
        }

        return isValid;
    };

    // Email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Show status message
    const showStatusMessage = (message, type = 'info') => {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 5000);
    };

    // Generate PDF
    const generatePDF = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            showStatusMessage('Generating PDF...', 'info');
            downloadPdfBtn.disabled = true;
            downloadPdfBtn.textContent = 'Generating...';

            // Check if jsPDF is loaded
            if (typeof window.jspdf === 'undefined') {
                throw new Error('PDF library not loaded. Please refresh the page and try again.');
            }

            // Create PDF using jsPDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Set up dimensions
            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);
            let yPosition = margin;
            
            // Helper function to add text with word wrapping
            const addText = (text, x, y, fontSize = 10, style = 'normal') => {
                pdf.setFontSize(fontSize);
                pdf.setFont('helvetica', style);
                const lines = pdf.splitTextToSize(text, contentWidth - x + margin);
                pdf.text(lines, x, y);
                return y + (lines.length * fontSize * 0.4);
            };
            
            // Helper function to check if we need a new page
            const checkPageBreak = (neededHeight) => {
                if (yPosition + neededHeight > pageHeight - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }
            };

            // Title
            pdf.setFontSize(24);
            pdf.setFont('helvetica', 'bold');
            pdf.text('INVOICE', margin, yPosition);
            yPosition += 10;
            
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Professional Services Invoice', margin, yPosition);
            yPosition += 15;

            // Vendor and Client Info Side by Side
            const leftCol = margin;
            const rightCol = pageWidth / 2 + 10;
            
            // Vendor Info
            let leftY = yPosition;
            pdf.setFont('helvetica', 'bold');
            pdf.text('Vendor Information:', leftCol, leftY);
            leftY += 6;
            pdf.setFont('helvetica', 'normal');
            
            const vendorName = document.getElementById('vendor-name').value || 'N/A';
            const vendorAddress = document.getElementById('vendor-address').value || 'N/A';
            const vendorCity = document.getElementById('vendor-city').value || 'N/A';
            const vendorEmail = document.getElementById('vendor-email').value || 'N/A';
            
            leftY = addText(vendorName, leftCol, leftY);
            leftY = addText(vendorAddress, leftCol, leftY);
            leftY = addText(vendorCity, leftCol, leftY);
            leftY = addText(vendorEmail, leftCol, leftY);

            // Invoice Details
            let rightY = yPosition;
            pdf.setFont('helvetica', 'bold');
            pdf.text('Invoice Details:', rightCol, rightY);
            rightY += 6;
            pdf.setFont('helvetica', 'normal');
            
            const invoiceNum = document.getElementById('invoice-number').value || 'N/A';
            const invoiceDate = document.getElementById('invoice-date').value || 'N/A';
            const payTerms = document.getElementById('pay-terms').value || 'N/A';
            const poNumber = document.getElementById('po-number').value || '';
            
            rightY = addText(`Invoice #: ${invoiceNum}`, rightCol, rightY);
            rightY = addText(`Date: ${invoiceDate}`, rightCol, rightY);
            rightY = addText(`Terms: ${payTerms}`, rightCol, rightY);
            if (poNumber) rightY = addText(`PO#: ${poNumber}`, rightCol, rightY);

            yPosition = Math.max(leftY, rightY) + 10;

            // Bill To and Cost Center
            checkPageBreak(30);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Bill To:', leftCol, yPosition);
            pdf.text('Cost Center:', rightCol, yPosition);
            yPosition += 6;
            pdf.setFont('helvetica', 'normal');
            
            const clientName = document.getElementById('client-name').value || 'N/A';
            const hiringManager = document.getElementById('hiring-manager').value || 'N/A';
            const hiringEmail = document.getElementById('hiring-manager-email').value || 'N/A';
            const costCenter = document.getElementById('cost-center').value || 'N/A';
            
            leftY = yPosition;
            leftY = addText(clientName, leftCol, leftY);
            leftY = addText(hiringManager, leftCol, leftY);
            leftY = addText(hiringEmail, leftCol, leftY);
            
            rightY = yPosition;
            const costCenterText = document.getElementById('cost-center').selectedOptions[0]?.text || costCenter;
            rightY = addText(costCenterText, rightCol, rightY);
            
            yPosition = Math.max(leftY, rightY) + 10;

            // Service Period
            checkPageBreak(20);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Service Period:', margin, yPosition);
            yPosition += 6;
            pdf.setFont('helvetica', 'normal');
            
            const serviceStart = document.getElementById('service-start').value || 'N/A';
            const serviceEnd = document.getElementById('service-end').value || 'N/A';
            yPosition = addText(`${serviceStart} to ${serviceEnd}`, margin, yPosition);
            yPosition += 10;

            // Invoice Items Table
            checkPageBreak(40);
            
            pdf.setFont('helvetica', 'bold');
            pdf.text('Invoice Items:', margin, yPosition);
            yPosition += 8;

            // Table headers
            const colWidths = [60, 25, 20, 25, 25];
            const colPositions = [margin];
            for (let i = 1; i < colWidths.length; i++) {
                colPositions[i] = colPositions[i-1] + colWidths[i-1];
            }

            // Draw table header
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.text('Service/Item', colPositions[0], yPosition);
            pdf.text('Job Code', colPositions[1], yPosition);
            pdf.text('Hours', colPositions[2], yPosition);
            pdf.text('Rate', colPositions[3], yPosition);
            pdf.text('Amount', colPositions[4], yPosition);
            yPosition += 6;

            // Draw header line
            pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
            yPosition += 2;

            // Table rows
            pdf.setFont('helvetica', 'normal');
            let subtotal = 0;
            
            document.querySelectorAll('.table-row').forEach(row => {
                checkPageBreak(15);
                
                const serviceInput = row.querySelector('.service-input');
                const service = serviceInput.dataset.selectedValue || serviceInput.value || 'N/A';
                const jobCode = row.querySelector('.job-code').value || '';
                const hours = row.querySelector('.quantity').value || '0';
                const rate = row.querySelector('.rate').value || '0';
                const amount = parseFloat(hours) * parseFloat(rate);
                subtotal += amount;

                // Truncate service name if too long
                const serviceName = service.length > 35 ? service.substring(0, 35) + '...' : service;
                
                pdf.text(serviceName, colPositions[0], yPosition);
                pdf.text(jobCode, colPositions[1], yPosition);
                pdf.text(hours, colPositions[2], yPosition);
                pdf.text(`$${parseFloat(rate).toFixed(2)}`, colPositions[3], yPosition);
                pdf.text(`$${amount.toFixed(2)}`, colPositions[4], yPosition);
                yPosition += 5;
            });

            yPosition += 10;

            // Totals
            checkPageBreak(25);
            
            const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const taxAmount = subtotal * (taxRate / 100);
            const grandTotal = subtotal + taxAmount;

            const totalsX = pageWidth - margin - 60;
            pdf.setFont('helvetica', 'normal');
            pdf.text('Subtotal:', totalsX, yPosition);
            pdf.text(`$${subtotal.toFixed(2)}`, totalsX + 35, yPosition);
            yPosition += 6;

            if (taxRate > 0) {
                pdf.text(`Tax (${taxRate}%):`, totalsX, yPosition);
                pdf.text(`$${taxAmount.toFixed(2)}`, totalsX + 35, yPosition);
                yPosition += 6;
            }

            pdf.setFont('helvetica', 'bold');
            pdf.text('Total:', totalsX, yPosition);
            pdf.text(`$${grandTotal.toFixed(2)}`, totalsX + 35, yPosition);

            // Generate filename
            const vendorNameClean = vendorName
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+/g, '_')
                .substring(0, 20) || 'Invoice';
            const invoiceNumberClean = invoiceNum.replace(/[^a-zA-Z0-9]/g, '_') || 'INV-001';
            const invoiceDateClean = invoiceDate || new Date().toISOString().split('T')[0];
            
            const filename = `${vendorNameClean}_${invoiceNumberClean}_${invoiceDateClean}.pdf`;

            // Save the PDF
            pdf.save(filename);
            showStatusMessage('PDF downloaded successfully!', 'success');
            
        } catch (error) {
            console.error('PDF generation error:', error);
            showStatusMessage(`Error generating PDF: ${error.message}`, 'error');
        } finally {
            downloadPdfBtn.disabled = false;
            downloadPdfBtn.textContent = 'Download PDF';
        }
    };

    // Submit to Google Sheets
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            showStatusMessage('Submitting data to spreadsheet...', 'info');

            // Collect form data
            const invoiceData = {
                timestamp: new Date().toISOString(),
                costCenter: document.getElementById('cost-center').value,
                vendorName: document.getElementById('vendor-name').value,
                vendorAddress: document.getElementById('vendor-address').value,
                vendorCity: document.getElementById('vendor-city').value,
                vendorEmail: document.getElementById('vendor-email').value,
                clientName: document.getElementById('client-name').value,
                hiringManager: document.getElementById('hiring-manager').value,
                hiringManagerEmail: document.getElementById('hiring-manager-email').value,
                invoiceNumber: document.getElementById('invoice-number').value,
                invoiceDate: document.getElementById('invoice-date').value,
                payTerms: document.getElementById('pay-terms').value,
                poNumber: document.getElementById('po-number').value || '',
                serviceStart: document.getElementById('service-start').value,
                serviceEnd: document.getElementById('service-end').value,
                subtotal: subtotalEl.textContent,
                taxRate: taxRateEl.value,
                grandTotal: grandTotalEl.textContent,
                items: []
            };

            // Collect items data
            document.querySelectorAll('.table-row').forEach(row => {
                const serviceInput = row.querySelector('.service-input');
                const serviceItem = serviceInput.dataset.selectedValue || serviceInput.value;
                const jobCode = row.querySelector('.job-code').value;
                const hours = row.querySelector('.quantity').value;
                const rate = row.querySelector('.rate').value;
                const amount = row.querySelector('.amount-cell').textContent;
                
                if (serviceItem) { // Only add rows with selected services
                    invoiceData.items.push({
                        serviceItem,
                        jobCode: jobCode || '',
                        hours: hours || '0',
                        rate: rate || '0',
                        amount
                    });
                }
            });

            // Submit to Google Apps Script
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                throw new Error('Please configure your Google Apps Script URL in the JavaScript file');
            }

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                showStatusMessage('Data submitted successfully to spreadsheet!', 'success');
            } else {
                throw new Error(result.error || 'Unknown error occurred');
            }
            
        } catch (error) {
            console.error('Submission error:', error);
            showStatusMessage(`Error submitting data: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit to Spreadsheet';
        }
    };

    // Clear validation errors on input
    const clearValidationError = (e) => {
        if (e.target.classList.contains('validation-error')) {
            e.target.classList.remove('validation-error');
        }
    };

    // Event Listeners
    addItemBtn.addEventListener('click', createItemRow);
    submitBtn.addEventListener('click', handleSubmit);
    downloadPdfBtn.addEventListener('click', generatePDF);
    taxRateEl.addEventListener('input', calculateTotals);
    
    // Handle remove and duplicate buttons
    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            e.target.closest('.table-row').remove();
            calculateTotals();
            
            // Ensure at least one row exists
            if (itemsContainer.children.length === 0) {
                createItemRow();
            }
        } else if (e.target.classList.contains('duplicate-item-btn')) {
            const originalRow = e.target.closest('.table-row');
            duplicateItem(originalRow);
        }
    });
    
    // Clear validation errors and recalculate on input
    invoiceForm.addEventListener('input', (e) => {
        clearValidationError(e);
        if (e.target.classList.contains('quantity') || e.target.classList.contains('rate') || e.target.id === 'tax-rate') {
            calculateTotals();
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-list').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Initialize the form
    initializeDates();
    createItemRow(); // Create initial item row
    calculateTotals();

    console.log('Invoice form initialized successfully');
});
