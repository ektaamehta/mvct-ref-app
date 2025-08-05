function markRequiredAsterisks($context) {
    const $scope = $context || $(document);

    $scope
        .find("input[required], select[required], textarea[required]")
        .each(function () {
            const $input = $(this);
            const name = $input.attr("name");

            if (!name) return;

            // Find the closest label in the same form-group or wrapper
            let $label = $input
                .closest(".form-group, .mb-3, .row, div") // Bootstrap or generic wrappers
                .find("label")
                .filter(function () {
                    // Avoid nested labels not related to this input
                    return (
                        $(this).nextAll(`[name="${name}"]`).length > 0 ||
                        $(this).siblings(`[name="${name}"]`).length > 0
                    );
                })
                .first();

            // Fallback: previous sibling
            if (!$label.length) {
                $label = $input.prev("label");
            }

            if (
                $label.length &&
                $label.find(".required-asterisk").length === 0
            ) {
                $label.append(
                    ' <span class="text-danger required-asterisk">*</span>'
                );
            }
        });
}

function displayResults(selector, data) {
    const resultsDiv = $(selector);
    resultsDiv.empty();
    let parsed = data;

    // If it's a string that looks like JSON, try to parse
    if (typeof data === "string") {
        try {
            // Parse first level
            parsed = JSON.parse(data);
            // If it's STILL a string, parse one more time (for double-encoded JSON)
            if (typeof parsed === "string") {
                parsed = JSON.parse(parsed);
            }
        } catch (e) {
            // Log the error for debugging purposes
            console.error("Failed to parse JSON in displayResults:", e);
            // leave as string if not valid JSON
            parsed = data;
        }
    }

    // Pretty print for objects or arrays, otherwise show as text
    if (typeof parsed === "object") {
        resultsDiv.html(`<pre>${JSON.stringify(parsed, null, 2)}</pre>`);
    } else {
        resultsDiv.text(parsed);
    }
}

$(document).ready(function () {
    $.validator.addMethod(
        "pattern",
        function (value, element, regexp) {
            if (this.optional(element)) {
                return true;
            }

            if (typeof regexp === "string") {
                regexp = new RegExp(regexp);
            }

            return regexp.test(value);
        },
        "Invalid format."
    );

    markRequiredAsterisks(); // for initial load

    // Form validation rules
    $("#checkout-form").validate({
        ignore: [],
        normalizer: function (value) {
            return value.trim();
        },
        rules: {
            xSrcCxFlowId: {},
            xSrcResponseHost: {},
            srcClientId: {
                required: true,
                pattern:
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            },
            srcDpaId: {},
            srcCorrelationId: {
                pattern:
                    /^([0-9a-f]{8}\.)?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            },
            serviceId: {},
            srciTransactionId: {
                maxlength: 255,
            },
            payloadTypeIndicatorCheckout: {},
            recipientIdCheckout: {
                pattern:
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            },
            srcDigitalCardId: {},
            keyFingerprintId: {},
            merchantCategoryCode: {},
            merchantCountryCode: {},
            threeDsPreference: {},
            dpaLocale: {},
            transactionAmount: {
                required: true,
            },
            transactionCurrencyCode: {
                required: true,
            },
            acceptHeader: {},
            javaEnabled: {},
            javascriptEnabled: {},
            ip: {},
            language: {},
            colorDepth: {},
            screenHeight: {},
            screenWidth: {},
            tz: {},
            userAgent: {},
            bin: {},
            merchantID: {},
            unpredictableNumber: {
                pattern: /^[0-9a-fA-F]+$/,
            },
            dynamicDataType: {},
            verificationType: {},
            verificationEntity: {},
            verificationMethod: {},
            verificationResults: {},
            verificationTimestamp: {},
            additionalData: {},
            verificationEvents: {},
            dpaPresentationName: {
                maxlength: 60,
            },
            dpaName: {
                maxlength: 60,
            },
            dpaUri: {
                maxlength: 1024,
            },
            acceptanceChannelType: {
            },
            acceptanceChannelTechnology: {},
            billNumber: {},
            mobileNumber: {},
            storeLabel: {},
            loyaltyNumber: {},
            referenceLabel: {},
            customerLabel: {},
            terminalLabel: {},
            purposeOftransaction: {},
            emailId: {},
            phoneNumber: {},
            address: {},
            qrCodeData: {},
            digitalAccountReferenceValue: {
            },
            digitalAccountReferenceType: {
            },

            //
        },
        messages: {
            srcClientId: {
                required: "srcClientId is required.",
                pattern:
                    "Invalid format. Must match a UUID or prefixed UUID format.",
            },
            srcCorrelationId: {
                pattern:
                    "Invalid format. Must match a UUID or prefixed UUID format.",
            },
            unpredictableNumber: {
                pattern: "Invalid format.",
            },
        },
        invalidHandler: function (form, validator) {
            if (validator.errorList.length) {
                $("html, body").animate(
                    {
                        scrollTop:
                            $(validator.errorList[0].element).offset().top -
                            100,
                    },
                    500
                );
            }
        },
        submitHandler: function (_form, event) {
            event.preventDefault();
        },
    });
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#spinner").removeClass("loading");
    setDynamicDropdownValues();

    const reference = generateReference();
    // $("#srcCorrelationId").val(reference);
    function generateReference() {
        function generateUUID() {
            // RFC4122 version 4 compliant UUID
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    const r = (Math.random() * 16) | 0;
                    const v = c === "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        }

        const usePrefix = Math.random() < 0.5; // 50% chance to use prefix
        const uuid = generateUUID();

        if (usePrefix) {
            const prefix = Math.random().toString(16).slice(2, 10); // 8 hex chars
            return `${prefix}.${uuid}`;
        } else {
            return uuid;
        }
    }

    // Handle Create Funding Transfer form submission
    $("#checkout-form").on("submit", function (e) {
        e.preventDefault();

        const allVerificationData = collectAllVerificationData();

        if ($("#checkout-form").valid()) {
            // Similarly for other sections (example: dpaData)
            const dpaData = {
                dpaPresentationName: $("#dpaPresentationName").val(),
                dpaName: $("#dpaName").val(),
                dpaUri: $("#dpaUri").val(),
            };

            const threeDsInputData = {
                browser: {
                    acceptHeader: $("#acceptHeader").val(),
                    javaEnabled: $("#javaEnabled").val(),
                    javascriptEnabled: $("#javascriptEnabled").val(),
                    ip: $("#ip").val(),
                    language: $("#language").val(),
                    colorDepth: $("#colorDepth").val(),
                    screenHeight: $("#screenHeight").val(),
                    screenWidth: $("#screenWidth").val(),
                    tz: $("#tz").val(),
                    userAgent: $("#userAgent").val(),
                },
                acquirer: {
                    bin: $("#bin").val(),
                    merchantID: $("#merchantID").val(),
                },
            };

            // Gather the form data for each block
            const consumerData = {
                billNumber: $("#billNumber").val(),
                mobileNumber: $("#mobileNumber").val(),
                storeLabel: $("#storeLabel").val(),
                loyaltyNumber: $("#loyaltyNumber").val(),
                referenceLabel: $("#referenceLabel").val(),
                customerLabel: $("#customerLabel").val(),
                terminalLabel: $("#terminalLabel").val(),
                purposeOftransaction: $("#purposeOftransaction").val(),
                emailId: $("#emailId").val(),
                phoneNumber: $("#phoneNumber").val(),
                address: $("#address").val(),
            };

            const sellerData = {
                qrCodeData: $("#qrCodeData").val(),
            };

            let acceptanceChannelData = {};
            if (hasAnyValueDeep(consumerData)) acceptanceChannelData.consumerData = consumerData;
            if (hasAnyValueDeep(sellerData)) acceptanceChannelData.sellerData = sellerData;

            // Now build acceptanceChannelRelatedData only if needed
            let acceptanceChannelRelatedData;
            if (
                $("#acceptanceChannelType").val() ||
                hasAnyValueDeep(acceptanceChannelData)
            ) {
                acceptanceChannelRelatedData = {
                    acceptanceChannelType: $("#acceptanceChannelType").val(),
                };
                if (hasAnyValueDeep(acceptanceChannelData)) {
                    acceptanceChannelRelatedData.acceptanceChannelData = acceptanceChannelData;
                }
            }

            let requestData = {
                srcClientId: $("#srcClientId").val(),
                srcDpaId: $("#srcDpaId").val(),
                serviceId: $("#serviceId").val(),
                dpaTransactionOptions: {
                    transactionAmount: {
                        transactionAmount: $("#transactionAmount").val(),
                        transactionCurrencyCode: $(
                            "#transactionCurrencyCode"
                        ).val(),
                    },
                    paymentOptions: [
                        {
                            dynamicDataType: $("#dynamicDataType").val(),
                        },
                    ],
                },

            };

            if (acceptanceChannelRelatedData) {
                requestData.acceptanceChannelRelatedData = acceptanceChannelRelatedData;
            }

            const srciTransactionId = $("#srciTransactionId").val();
            if (srciTransactionId && srciTransactionId.trim() !== "") {
                requestData.srciTransactionId = srciTransactionId;
            }

            const srcCorrelationId = $("#srcCorrelationId").val();
            if (srcCorrelationId && srcCorrelationId.trim() !== "") {
                requestData.srcCorrelationId = srcCorrelationId;
            }

            const srcDigitalCardId = $("#srcDigitalCardId").val();
            if (srcDigitalCardId && srcDigitalCardId.trim() !== "") {
                requestData.srcDigitalCardId =
                    srcDigitalCardId;
            } else if($("#digitalAccountReferenceValue").val() && $("#digitalAccountReferenceValue").val().trim() !== "") {
                // Otherwise include digitalAccountCredentials
                requestData.digitalAccountCredentials = {
                    digitalAccountReference: {
                        digitalAccountReferenceValue: $("#digitalAccountReferenceValue").val(),
                        digitalAccountReferenceType: $("#digitalAccountReferenceType").val(),
                    },
                };
            }

            const recipientIdCheckout = $("#recipientIdCheckout").val();
            if (recipientIdCheckout && recipientIdCheckout.trim() !== "") {
                requestData.recipientIdCheckout = recipientIdCheckout;
            }

            const payloadTypeIndicatorCheckout = $(
                "#payloadTypeIndicatorCheckout"
            ).val();
            if (
                payloadTypeIndicatorCheckout &&
                payloadTypeIndicatorCheckout.trim() !== ""
            ) {
                requestData.payloadTypeIndicatorCheckout =
                    payloadTypeIndicatorCheckout;
            }

            const acceptanceChannelTechnology = $(
                "#acceptanceChannelTechnology"
            ).val();
            if (
                acceptanceChannelTechnology &&
                acceptanceChannelTechnology.trim() !== ""
            ) {
                requestData.acceptanceChannelRelatedData.acceptanceChannelTechnology =
                    acceptanceChannelTechnology;
            }

            const threeDsPreference = $("#threeDsPreference").val();
            if (threeDsPreference && threeDsPreference.trim() !== "") {
                requestData.dpaTransactionOptions.threeDsPreference = threeDsPreference;
            }

            const dpaLocale = $("#dpaLocale").val();
            if (dpaLocale && dpaLocale.trim() !== "") {
                requestData.dpaTransactionOptions.dpaLocale = dpaLocale;
            }

            const merchantCategoryCode = $("#merchantCategoryCode").val();
            if (merchantCategoryCode && merchantCategoryCode.trim() !== "") {
                requestData.dpaTransactionOptions.merchantCategoryCode =
                    merchantCategoryCode;
            }

            const merchantCountryCode = $("#merchantCountryCode").val();
            if (merchantCountryCode && merchantCountryCode.trim() !== "") {
                requestData.dpaTransactionOptions.merchantCountryCode = merchantCountryCode;
            }

            if (hasAnyValueDeep(dpaData)) requestData.dpaData = dpaData;

            const browserFilled = hasAnyValueDeep(threeDsInputData.browser);
            const acquirerFilled = hasAnyValueDeep(threeDsInputData.acquirer);

            if (browserFilled || acquirerFilled) {
                requestData.dpaTransactionOptions.threeDsInputData = {};
                if (browserFilled) {
                    requestData.dpaTransactionOptions.threeDsInputData.browser =
                        threeDsInputData.browser;
                }
                if (acquirerFilled) {
                    requestData.dpaTransactionOptions.threeDsInputData.acquirer =
                        threeDsInputData.acquirer;
                }
            }

            if (allVerificationData.length > 0) {
                requestData.assuranceData = {
                    verificationData: allVerificationData,
                };
            }

            let srcTokenRequestDataValue = $("#unpredictableNumber").val();
            // Add srcTokenRequestData **only if it has a value**
            if (srcTokenRequestDataValue) {
                requestData.dpaTransactionOptions.srcTokenRequestData = {
                    unpredictableNumber: srcTokenRequestDataValue,
                };
            }

            let keyFingerprintIdValue = $("#keyFingerprintId").val();
            if (keyFingerprintIdValue) {
                requestData.keyFingerprintId = keyFingerprintIdValue;
            }

            console.log("Request Data:", requestData);

            const xSrcCxFlowId = $("#xSrcCxFlowId").val();
            const xSrcResponseHost = $("#xSrcResponseHost").val();

            // Display request details
            displayResults("#requestBodyContent", requestData);
            const requestHeaders = {
                "X-Src-Cx-Flow-Id": xSrcCxFlowId,
                "X-Src-Response-Host": xSrcResponseHost,
                // add other headers here as needed
                "Content-Type": "application/json"
            };
            displayResults("#requestHeadersContent", requestHeaders);

            // Show the loader
            showLoader();

            $.ajax({
                url: SERVER_URL + `/transaction/credentials`,
                type: "POST",
                headers: requestHeaders,
                contentType: "application/json",
                data: JSON.stringify(requestData),
                success: function (response) {
                    console.log("Response:", response);

                    // Show backend HTTP response body
                    displayResults("#responseContent", response.body || response);

                    // --- Show Mastercard response headers from JSON, if present ---
                    if (response.headers) {
                        displayResults("#mastercardResponseHeadersContent", response.headers);
                    } else {
                        $("#mastercardResponseHeadersContent").empty();
                    }
                },
                error: function (jqXHR) {
                    let errorResponse;
                    try {
                        errorResponse = JSON.parse(jqXHR.responseText);
                        if (typeof errorResponse === "string") {
                            try {
                                errorResponse = JSON.parse(errorResponse);
                            } catch (e) {
                                console.warn("Failed to parse error response as JSON:", e);
                                // Not JSON, leave as string
                            }
                        }
                    } catch (e) {
                        console.error("Error parsing error response JSON:", e);
                        errorResponse = jqXHR.responseText;
                    }
                    // If you have body/headers structure prefer .body for responseContent!
                    if (typeof errorResponse === "object" && errorResponse.body) {
                        displayResults("#responseContent", errorResponse.body);
                        if (errorResponse.headers) {
                            displayResults("#mastercardResponseHeadersContent", errorResponse.headers);
                        } else {
                            $("#mastercardResponseHeadersContent").empty();
                        }
                    } else {
                        // fallback for older errors
                        displayResults("#responseContent", errorResponse);
                        $("#mastercardResponseHeadersContent").empty();
                    }
                },
                complete: function () {
                    hideLoader();
                },
            });
        }
    });

    // Function to show loader
    function showLoader() {
        $("#spinner").addClass("loading");
    }

    // Function to hide loader
    function hideLoader() {
        $("#spinner").removeClass("loading");
    }

    // Function to set dynamic dropdown values
    function setDynamicDropdownValues() {
        const dynamicDropdowns = [
            {
                id: "dynamicDataType",
                url: "/assets/config/dynamic-data-type.json",
            },
            {
                id: "verificationType",
                url: "/assets/config/verification-type.json",
            },
            {
                id: "verificationEntity",
                url: "/assets/config/verification-entity.json",
            },
            {
                id: "verificationMethod",
                url: "/assets/config/verification-method.json",
            },
            {
                id: "verificationResults",
                url: "/assets/config/verification-results.json",
            },
            {
                id: "verificationEvents",
                url: "/assets/config/verification-events.json",
            },
            {
                id: "payloadTypeIndicatorCheckout",
                url: "/assets/config/payload-type-indicator-checkout.json",
            },
            {
                id: "threeDsPreference",
                url: "/assets/config/three-ds-preference.json",
            },
            {
                id: "acceptanceChannelType",
                url: "/assets/config/acceptance-channel-type.json",
            },
            {
                id: "acceptanceChannelTechnology",
                url: "/assets/config/acceptance-channel-technology.json",
            },
            {
                id: "digitalAccountReferenceType",
                url: "/assets/config/digital-account-reference-type.json",
            },
        ];

        for (let dropdown of dynamicDropdowns) {
            const element = $("#" + dropdown.id);
            element.empty();
            $.getJSON(dropdown.url, function (data) {
                $.each(data, function (_key, entry) {
                    element.append(
                        $("<option></option>")
                            .attr("value", entry.value)
                            .text(entry.name)
                    );
                });
            });
        }
    }

    // Fetch configuration values from the backend
    $.get(SERVER_URL + "/api/config", function (data) {
        // Example: set input values if present in response
        if (data.srcClientId) {
            $("#srcClientId").val(data.srcClientId);
        }
        if (data.srcDpaId) {
            $("#srcDpaId").val(data.srcDpaId);
        }
        if (data.serviceId) {
            $("#serviceId").val(data.serviceId);
        }
        // You can add as many fields as needed
    });

    // Add new block
    $("#add-verification-data-btn").on("click", function () {
        const template = $(getVerificationDataTemplate());
        setDynamicDropdownValuesForBlock(template);
        $("#verification-data-list").append(template);

        // Attach required logic for the block
        template.on(
            "input change",
            `
        select[name="verificationType[]"],
        select[name="verificationEntity[]"],
        select[name="verificationMethod[]"],
        select[name="verificationResults[]"],
        input[name="verificationTimestamp[]"],
        select[name="verificationEvents[]"]
    `,
            function () {
                updateDynamicBlockRequired(template);
                $(this).valid(); // optional: validate as user types/selects
            }
        );

        // Add validator rules to the required fields (on initial add)
        template
            .find(
                'select[name="verificationType[]"],select[name="verificationEntity[]"],select[name="verificationMethod[]"],select[name="verificationResults[]"],input[name="verificationTimestamp[]"],select[name="verificationEvents[]"]'
            )
            .each(function () {
                if ($(this).prop("required")) {
                    $(this).rules("add", { required: true });
                }
            });

        updateDynamicBlockRequired(template);
    });

    // Remove block
    $("#verification-data-list").on(
        "click",
        ".remove-verification-data-btn",
        function () {
            $(this).closest(".verification-data-item").remove();
        }
    );

    // On page load, initialize dropdowns in the first block
    setDynamicDropdownValuesForBlock(
        $("#verification-data-list .verification-data-item").first()
    );

    // close modal on click of close button
    $("#closeEncryptCardModal").on("click", function () {
        $("#encryptCardModal").modal("hide");
    });

    // close modal on click of close button
    $("#closeEncryptCardModalFooter").on("click", function () {
        $("#encryptCardModal").modal("hide");
    });

    $("#encryptCard").on("click", function () {
        if ($("#encrypt-card-form").valid()) {
            $("#spinner").addClass("loading");
            const request_data = createEncryptCardRequestObject();
            console.log(request_data);
            // API CALL to encrypt card details
            $.ajax({
                data: JSON.stringify(request_data),
                url: SERVER_URL + "/cards/encrypt",
                type: "POST",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                },
                success: function (response, _statusCode, _xhr) {
                    $("#spinner").removeClass("loading");
                    $("#digitalAccountReferenceValue").val(response.data);
                    $("#encryptCardModal").modal("hide");
                },
                error: function (_jqXHR, _textStatus, _errorThrown) {
                    $("#spinner").removeClass("loading");
                },
            });
        }
    });

    $("#digitalAccountReferenceType").on("change", function () {
        const selectedType = $(this).val();
        const $refValue = $("#digitalAccountReferenceValue");

        if (selectedType === "ENCRYPTED_CARD") {
            $refValue
                .val("eyJraWQiOiIyMDIzMDIwNzIyMzUyMS1zYW5kYm94LWZwYW4tZW5jcnlwdGlvbi1zcmMtbWFzdGVyY2FyZC1pbnQiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.Uz7wGxk3m8S2viNStGuwPr4j2fP3wT_00WQN7LVOkUwD-Kf-bQvtpRkl2Fvj1byzIgOrbb2gILMvnbPhZ62K69idt7lBEgZB8JbZbQ0ON5B3KpUusX2QtsgaMIEdDQRqUCfFI5IedSr_vnnJU1l-sZRvYcmklwxWhzSURBqjO5lqHaqPtNshozBXCq4ftNj0OdfGroQdKKfiubS3aN304_u2pTOhDwni79IHrbl3-WFgYCpP2xJ3Bjdw1ORj9I19PM1qobSTPFO83atqZAfcI1SIBN6lsXh3GBSmjmBmLGncF39ItRlaYvLdBFNcDPRnX9Vdw_z_4WCfaMexvsk3LA.dwXlD4aCsyba80yG.KlM4dLtZAREZl6nosoT186J5D9cSxO3Oc4ZQv_RD_oM3Bkwu5zf8ZhtasYvIIOTSSlYVYSVRcMIPdT1QTN8i_keRDJaYmmG7do3P4iKm5XlEHZ3HgpH5XLSBY9GO6EDj7NAs5W8A8co_c-J1CueNISqc6t5EzjCyDw.RUaTuqZCDcaKDZ2F-rGxjQ") // You can set a default or example value if desired
                .attr("placeholder", "eyJraWQiOiIyMDIzMDIwNzIyMzUyMS1zYW5kYm94LWZwYW4tZW5jcnlwdGlvbi1zcmMtbWFzdGVyY2FyZC1pbnQiLCJlbmMiOiJBMTI4R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.Uz7wGxk3m8S2viNStGuwPr4j2fP3wT_00WQN7LVOkUwD-Kf-bQvtpRkl2Fvj1byzIgOrbb2gILMvnbPhZ62K69idt7lBEgZB8JbZbQ0ON5B3KpUusX2QtsgaMIEdDQRqUCfFI5IedSr_vnnJU1l-sZRvYcmklwxWhzSURBqjO5lqHaqPtNshozBXCq4ftNj0OdfGroQdKKfiubS3aN304_u2pTOhDwni79IHrbl3-WFgYCpP2xJ3Bjdw1ORj9I19PM1qobSTPFO83atqZAfcI1SIBN6lsXh3GBSmjmBmLGncF39ItRlaYvLdBFNcDPRnX9Vdw_z_4WCfaMexvsk3LA.dwXlD4aCsyba80yG.KlM4dLtZAREZl6nosoT186J5D9cSxO3Oc4ZQv_RD_oM3Bkwu5zf8ZhtasYvIIOTSSlYVYSVRcMIPdT1QTN8i_keRDJaYmmG7do3P4iKm5XlEHZ3HgpH5XLSBY9GO6EDj7NAs5W8A8co_c-J1CueNISqc6t5EzjCyDw.RUaTuqZCDcaKDZ2F-rGxjQ");
        } else if (selectedType === "SRC_DIGITAL_CARD_ID") {
            $refValue.val("_oQZJ_K0TZKumZqnYohvPQ000000000000GB").attr("placeholder", "_oQZJ_K0TZKumZqnYohvPQ000000000000GB");
        } else if (selectedType === "ENCRYPTED_PAYMENT_TOKEN") {
            $refValue
                .val("")
                .attr("placeholder", "");
        } else {
            $refValue.val("").attr("placeholder", "");
        }
    });
});

// Template for new Verification Data block (use this to clone)
function getVerificationDataTemplate() {
    return `
    <div class="verification-data-item p-3 mb-3">
      <div class="row">
        <div class="col-md-6 form-group">
          <label>Verification Type</label>
          <select name="verificationType[]" class="form-control"></select>
        </div>
        <div class="col-md-6 form-group">
          <label>Verification Entity</label>
          <select name="verificationEntity[]" class="form-control"></select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <label>Verification Method</label>
          <select name="verificationMethod[]" class="form-control"></select>
        </div>
        <div class="col-md-6 form-group">
          <label>Verification Results</label>
          <select name="verificationResults[]" class="form-control"></select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <label>Verification Timestamp</label>
          <input type="text" name="verificationTimestamp[]" class="form-control" />
        </div>
        <div class="col-md-6 form-group">
          <label>Additional Data</label>
          <input type="text" name="additionalData[]" class="form-control" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-group">
          <label>Verification Events</label>
          <select name="verificationEvents[]" class="form-control"></select>
        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="row">
        <div class="col-12">
          <button type="button" class="remove-verification-data-btn btn btn-danger btn-sm mt-2">Remove</button>
        </div>
      </div>
    </div>
  `;
}

// Helper to populate dropdowns in new block
function setDynamicDropdownValuesForBlock($block) {
    $.getJSON("/assets/config/verification-type.json", function (data) {
        let $el = $block.find('select[name="verificationType[]"]');
        $el.empty();
        $.each(data, function (_key, entry) {
            $el.append(
                $("<option></option>")
                    .attr("value", entry.value)
                    .text(entry.name)
            );
        });
    });
    $.getJSON("/assets/config/verification-entity.json", function (data) {
        let $el = $block.find('select[name="verificationEntity[]"]');
        $el.empty();
        $.each(data, function (_key, entry) {
            $el.append(
                $("<option></option>")
                    .attr("value", entry.value)
                    .text(entry.name)
            );
        });
    });
    $.getJSON(
        "/assets/config/verification-method-enroll.json",
        function (data) {
            let $el = $block.find('select[name="verificationMethod[]"]');
            $el.empty();
            $.each(data, function (_key, entry) {
                $el.append(
                    $("<option></option>")
                        .attr("value", entry.value)
                        .text(entry.name)
                );
            });
        }
    );
    $.getJSON("/assets/config/verification-results.json", function (data) {
        let $el = $block.find('select[name="verificationResults[]"]');
        $el.empty();
        $.each(data, function (_key, entry) {
            $el.append(
                $("<option></option>")
                    .attr("value", entry.value)
                    .text(entry.name)
            );
        });
    });
    $.getJSON(
        "/assets/config/verification-events-enroll.json",
        function (data) {
            let $el = $block.find('select[name="verificationEvents[]"]');
            $el.empty();
            $.each(data, function (_key, entry) {
                $el.append(
                    $("<option></option>")
                        .attr("value", entry.value)
                        .text(entry.name)
                );
            });
        }
    );
}

function collectAllVerificationData() {
    const verificationDataArr = [];

    // 1. Add the main (top) block if it has any data
    const mainBlock = {
        verificationType: $("#verificationType").val(),
        verificationEntity: $("#verificationEntity").val(),
        verificationMethod: $("#verificationMethod").val(),
        verificationResults: $("#verificationResults").val(),
        verificationTimestamp: $("#verificationTimestamp").val(),
        additionalData: $("#additionalData").val(),
        verificationEvents: [$("#verificationEvents").val()],
    };

    // Check if any field is filled (except additionalData)
    if (
        mainBlock.verificationType ||
        mainBlock.verificationEntity ||
        mainBlock.verificationMethod ||
        mainBlock.verificationResults ||
        mainBlock.verificationTimestamp ||
        (mainBlock.verificationEvents && mainBlock.verificationEvents[0])
    ) {
        verificationDataArr.push(mainBlock);
    }

    // 2. Add all dynamic blocks
    $("#verification-data-list .verification-data-item").each(function () {
        const $block = $(this);
        const blockData = {
            verificationType: $block
                .find('select[name="verificationType[]"]')
                .val(),
            verificationEntity: $block
                .find('select[name="verificationEntity[]"]')
                .val(),
            verificationMethod: $block
                .find('select[name="verificationMethod[]"]')
                .val(),
            verificationResults: $block
                .find('select[name="verificationResults[]"]')
                .val(),
            verificationTimestamp: $block
                .find('input[name="verificationTimestamp[]"]')
                .val(),
            additionalData: $block.find('input[name="additionalData[]"]').val(),
            verificationEvents: [
                $block.find('select[name="verificationEvents[]"]').val(),
            ],
        };
        // Only push if at least one field is filled (excluding additionalData)
        if (
            blockData.verificationType ||
            blockData.verificationEntity ||
            blockData.verificationMethod ||
            blockData.verificationResults ||
            blockData.verificationTimestamp ||
            (blockData.verificationEvents && blockData.verificationEvents[0])
        ) {
            verificationDataArr.push(blockData);
        }
    });

    return verificationDataArr;
}

function updateDynamicBlockRequired($block) {
    const selectors = [
        'select[name="verificationType[]"]',
        'select[name="verificationEntity[]"]',
        'select[name="verificationMethod[]"]',
        'select[name="verificationResults[]"]',
        'input[name="verificationTimestamp[]"]',
        'select[name="verificationEvents[]"]',
    ];

    // Check if any field (except additionalData) has value
    let anyValue = selectors.some((sel) => {
        const $el = $block.find(sel);
        const val = $el.val();
        return val !== null && val !== "";
    });

    selectors.forEach((sel) => {
        $block.find(sel).each(function () {
            const $el = $(this);
            $el.prop("required", anyValue);

            // Robustly add/remove required rule for validator
            if (anyValue) {
                if (!$el.data("rulesAdded")) {
                    $el.rules("add", { required: true });
                    $el.data("rulesAdded", true);
                }
            }
            if (!anyValue && $el.data("rulesAdded")) {
                try {
                    $el.rules("remove", "required");
                } catch (e) {
                    console.error("Failed to remove 'required' rule:", e);
                }
                $el.data("rulesAdded", false);
            }
        });
    });

    // Additional Data never required
    $block.find('input[name="additionalData[]"]').prop("required", false);

    // Add/Remove asterisks as needed
    markRequiredAsterisks($block);
}

function hasAnyValueDeep(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    return Object.values(obj).some((val) =>
        typeof val === "object" && val !== null
            ? hasAnyValueDeep(val)
            : val !== undefined && val !== null && String(val).trim() !== ""
    );
}

function createEncryptCardRequestObject() {
    // Below code is used to format request json object
    let serialized = $("#encrypt-card-form").serializeArray();
    let data = {};
    for (let s in serialized) {
        data[serialized[s]["name"]] = serialized[s]["value"];
    }

    return data;
}