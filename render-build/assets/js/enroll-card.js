const SCENARIOS = {
    MVCT_ENCRYPTED_CARD: {
        required: [
            "srcClientId",
            "serviceId",
            "cardSource",
            "encryptedCard",
            "keyFingerprintId",
            "identityType",
            "identityValue",
        ],
        clear: [
            "enrolmentReferenceId",
            "enrolmentReferenceType",
            "authorization",
            "verificationType",
            "verificationEntity",
            "verificationMethod",
            "verificationResults",
            "verificationTimestamp",
            "additionalData",
            "verificationEvents",
        ],
        verificationMethod: "",
        additionalDataRequired: false,
        example: {
            srcClientId: "da547d77-0f9f-4d53-9cc3-3e9733ba9ff5",
            serviceId: "AUTOFILL#INTEGRATOR#01",
            cardSource: "WALLET",
            encryptedCard: "eyJraWQiOiIyMDIzMDIwNzIyMzUyMS1zYW5kYm94LWZwYW4tZW5jcnlwdGlvbi1zcmMtbWFzdGVyY2FyZC1pbnQiLCJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIn0.h767709rfmkTXc1USl5G8oO_bdbE2qyNzSEIN-x6kEHzaE1mcvo78ogShCehqZ_qOHdAZHTvwKTCZ79JqplkXbF1IPowrJbwqprnMcXBGvxgY7E52CAi4zGXq4FTLcjKeSs2mDHFb_YVwlUaImZleCR0IVgo0E8aGNyynuiuwCkPEUyzRAotbuuoEo7srHWastAbduc4UzxEMM66oD_YhNebD-jZIwV0qLcQazIOpo8rSIICYd-yH_ox45xNQV5n81X_Njm2cq_qL2xilApIxF08RyuWOKmJDep95NLCD1VQBj5DzdXc5FbPiLjTmRn3ZhuFytQpNy31NR_bAzyS0g.f2AFOEjkh9wJyU5t.xqiH8nr2O7bp6NAYqjDKvF1SV0YNle20ZW5whDkoXwQHTxWqDw_zmr36KPfmHisQrVpenQjoa_lCOTsLeVeui8nBtv164QZmMQEd0eVGdYABWjD054oKXNTwcNZC5OE6JZ6lyDmmvlY8hKm3PtC_gXyq2WSF571gmetHFpLHzhE.oKiKJu2Uqjj_0ClUpTGa2g",
            keyFingerprintId: "f61972736ed84deabdd5e1ce29d46baee93a39e1be7aa43b4ea7315a23292ad4",
            identityType: "EXTERNAL_ACCOUNT_ID",
            identityValue: "b92cc776-142f-4f2f-8239-deb648136749",
        },
    },
    MVCT_TUR_WITH_ID_AND_V: {
        required: [
            "srcClientId",
            "serviceId",
            "cardSource",
            "enrolmentReferenceId",
            "enrolmentReferenceType",
            "identityType",
            "identityValue",
            "verificationType",
            "verificationEntity",
            "verificationMethod",
            "verificationResults",
            "verificationTimestamp",
            "verificationEvents",
        ],
        clear: ["encryptedCard", "keyFingerprintId", "additionalData"],
        verificationMethod: "21",
        additionalDataRequired: false,
        example: {
            srcClientId: "13435294-fa4e-4acb-8fe6-05ab66b08881",
            serviceId: "AUTOFILL#INTEGRATOR#01",
            cardSource: "EXISTING_CREDENTIAL",
            enrolmentReferenceId:
                "DAPLMC00001441361ac692b044f046ee9451003182bad3da",
            enrolmentReferenceType: "TOKEN_UNIQUE_REFERENCE",
            identityType: "EXTERNAL_ACCOUNT_ID",
            identityValue: "868bd158-4aa9-452e-8193-899433e68450",
            verificationType: "CARDHOLDER",
            verificationEntity: "01",
            verificationMethod: "21",
            verificationResults: "01",
            verificationTimestamp: "2021-04-22T04:08:57.614Z",
            verificationEvents: "02",
        },
    },
    MVCT_TUR_WITH_DSRP: {
        required: [
            "srcClientId",
            "serviceId",
            "cardSource",
            "enrolmentReferenceId",
            "enrolmentReferenceType",
            "identityType",
            "identityValue",
            "verificationType",
            "verificationEntity",
            "verificationMethod",
            "verificationResults",
            "verificationTimestamp",
            "additionalData",
            "verificationEvents",
        ],
        clear: ["encryptedCard", "keyFingerprintId"],
        verificationMethod: "22",
        additionalDataRequired: true,
        example: {
            srcClientId: "13435294-fa4e-4acb-8fe6-05ab66b08881",
            serviceId: "AUTOFILL#INTEGRATOR#01",
            cardSource: "EXISTING_CREDENTIAL",
            enrolmentReferenceId:
                "DAPLMC00001441361ac692b044f046ee9451003182bad3da",
            enrolmentReferenceType: "TOKEN_UNIQUE_REFERENCE",
            identityType: "EXTERNAL_ACCOUNT_ID",
            identityValue: "868bd158-4aa9-452e-8193-899433e68450",
            verificationType: "CARDHOLDER",
            verificationEntity: "01",
            verificationMethod: "22",
            verificationResults: "01",
            verificationTimestamp: "2021-04-22T04:08:57.614Z",
            verificationEvents: "02",
            additionalData:
                "ewogICJ0b2tlblVuaXF1ZVJlZmVyZW5jZSI6ICJEV1NQTUMwMDAwMDAwMDBlNDJhNTk1NmNmMWI0ODk5OTQyZjVlNzRjODFkNWQ0ZiIsCiAgImRzcnBDcnlwdG9ncmFtIjogIkFJcnFiM1haU2JncEFBbDJsUWVER2dBREZBPT0iCn0=",
        },
    },
};

// Robustly mark all required fields in a given scope with an asterisk
function markRequiredAsterisks($context) {
    const $scope = $context || $(document);

    // Remove all old asterisks
    $scope.find(".required-asterisk").remove();

    // Loop through all visible required fields
    $scope
        .find("input[required], select[required], textarea[required]")
        .each(function () {
            const $input = $(this);
            const inputId = $input.attr("id");
            let $label = $();

            // Prefer label[for] when input has an ID
            if (inputId) {
                $label = $scope.find(`label[for="${inputId}"]`);
            }
            // Fallback to first label in same form-group or grid cell
            if (!$label.length) {
                $label = $input
                    .closest(
                        ".form-group, .mb-3, .col, .col-md-6, .col-xl-6, .row, div"
                    )
                    .find("label")
                    .first();
            }
            // Fallback to previous sibling label
            if (!$label.length) {
                $label = $input.prev("label");
            }
            // Add asterisk if not already present
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

function updateScenario(scenarioKey) {
    const scenario = SCENARIOS[scenarioKey];

    // 1. Remove required from all
    $("#card-enroll-form [name]").prop("required", false);

    // 2. Set required for this scenario
    scenario.required.forEach((name) =>
        $(`[name='${name}']`).prop("required", true)
    );

    // 3. Clear and disable fields as needed
    if (scenario.clear) {
        scenario.clear.forEach((name) => {
            $(`[name='${name}']`).val("").prop("required", false);
        });
    }

    // 4. Set default verificationMethod if needed
    if (scenario.verificationMethod) {
        $("#verificationMethod").val(scenario.verificationMethod);
    }

    // 5. Set additionalData as required for DSRP scenario
    if (scenario.additionalDataRequired) {
        $("#additionalData").prop("required", true);
    } else {
        $("#additionalData").prop("required", false);
    }

    // 6. Hide/show sections (optional: just keep visible, or hide with .closest(".row").hide() if not needed)
    // Example: if not required, you could hide those fields
    // But most keep them visible for easier debugging/testing.

    // 7. Update required asterisks
    markRequiredAsterisks($("#card-enroll-form"));

    // 8. Fill example/sample values (if not marked .from-config)
    if (scenario.example) {
        Object.entries(scenario.example).forEach(([name, value]) => {
            const $field = $(`[name='${name}']`);
            if (!$field.hasClass("from-config")) {
                $field.val(value);
            }
        });
    }
}

function shouldRequireAssuranceFields() {
    // If any field has value (ignoring additionalData)
    return (
        ($("#verificationType").val() || "").trim(),
        ($("#verificationEntity").val() || "").trim() ||
        ($("#verificationMethod").val() || "").trim() ||
        ($("#verificationResults").val() || "").trim() ||
        ($("#verificationTimestamp").val() || "").trim() ||
        $("#verificationEvents").val()?.trim()
    );
}

function updateAssuranceFieldRequirements() {
    const requireFields = shouldRequireAssuranceFields();

    // Always keep additionalData optional
    $("#additionalData").prop("required", false);

    // Make others required if any value is present, else not required
    [
        "#verificationType",
        "#verificationEntity",
        "#verificationMethod",
        "#verificationResults",
        "#verificationTimestamp",
        "#verificationEvents",
    ].forEach(function (sel) {
        $(sel).prop("required", requireFields);
    });

    markRequiredAsterisks($("#card-enroll-form"));
}

function hasAssuranceValue(fields) {
    // Exclude additionalData, check for any value in other fields
    return !!(
        fields.verificationType ||
        fields.verificationEntity ||
        fields.verificationMethod ||
        fields.verificationResults ||
        fields.verificationTimestamp ||
        fields.verificationEvents?.[0]
    );
}

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
            id: "cardSource",
            url: "/assets/config/card-source.json",
        },
        {
            id: "identityType",
            url: "/assets/config/identity-type.json",
        },
        {
            id: "paymentDataType",
            url: "/assets/config/payment-data-type.json",
        },
        {
            id: "enrolmentReferenceType",
            url: "/assets/config/enrolment-reference-type.json",
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
            url: "/assets/config/verification-method-enroll.json",
        },
        {
            id: "verificationResults",
            url: "/assets/config/verification-results.json",
        },
        {
            id: "verificationEvents",
            url: "/assets/config/verification-events-enroll.json",
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

function GetRecommendationReasonsDynamicTextBox(value) {
    return (
        '<input class="form-control" name="recommendationReasons[]" id="recommendationReasons" type="text" value = "' +
        value +
        '" /><br>' +
        '<input type="button" value="REMOVE" class="recommendation-reasons-remove btn btn-danger" /><br><br>'
    );
}

// -------------------- URL Parameter Handling --------------------
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

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

function hasAnyValue(obj) {
    if (Array.isArray(obj)) {
        // Check for any non-empty object/primitive in the array
        return obj.some((item) => hasAnyValue(item));
    }
    if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((val) => hasAnyValue(val));
    }
    // For primitives
    return obj !== undefined && obj !== null && obj !== "";
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
    // -------------------- Tab Click Logic --------------------
    $(".api-names-box").on("click", function (e) {
        const action = $(this).data("action");

        if (action === "ENROLL") {
            // Prevent navigation for ENROLL (tabbed view)
            e.preventDefault();

            window.history.replaceState({}, "", `?action=${action}`);
            $("#actionMode").val(action);
            $(".api-names-box").removeClass("active");
            $(this).addClass("active");
            $("h1").text(
                `${action.charAt(0).toUpperCase()}${action
                    .slice(1)
                    .toLowerCase()} Card`
            );
            // (Any other logic for ENROLL tab)
        }
    });

    // On page load, set scenario and sync required fields and asterisks
    const initialScenario = $("#scenarioDropdown").val();
    updateScenario(initialScenario);

    // Always run this once on load to sync required state
    updateAssuranceFieldRequirements();

    $("#scenarioDropdown").on("change", function () {
        updateScenario($(this).val());
        markRequiredAsterisks($("#card-enroll-form")); // <-- Add this!
    });

    const tabAction = getQueryParam("action");

    if (
        tabAction &&
        ["ENROLL", "GET", "DELETE", "RETRIEVE"].includes(
            tabAction.toUpperCase()
        )
    ) {
        const tabSelector = `.api-names-box[data-action="${tabAction.toUpperCase()}"]`;

        // Delay to ensure DOM and event handlers are ready
        setTimeout(() => {
            const tabElement = document.querySelector(tabSelector);
            if (tabElement) {
                tabElement.click(); // This triggers your .on("click") handler
            } else {
                console.warn("Tab element not found:", tabSelector);
            }
        }, 0);
    }

    // code to add & remove merchant category code Dynamically
    $("#recommendationReasonsBtnAdd").on("click", function () {
        let div = $(
            "<div class='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 p-0' />"
        );
        div.html(GetRecommendationReasonsDynamicTextBox(""));
        $("#merchant-category-codes-div").append(div);
        markRequiredAsterisks($("#card-enroll-form"));
    });
    $("body").on("click", ".recommendation-reasons-remove", function () {
        $(this).closest("div").remove();
        markRequiredAsterisks($("#card-enroll-form"));
    });

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

    // Form validation rules
    $("#card-enroll-form").validate({
        ignore: [],
        normalizer: function (value) {
            return value.trim();
        },
        rules: {
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
            serviceId: {
                required: true,
            },
            keyFingerprintId: {},
            encryptedCard: {},
            cardSource: {},
            identityType: {
                required: true,
            },
            identityValue: {
                required: true,
            },
            recommendation: {
                maxlength: 64,
            },
            recommendationAlgorithmVersion: {
                maxlength: 16,
            },
            deviceScore: {
                maxlength: 1,
            },
            accountScore: {
                maxlength: 1,
            },
            deviceCurrentLocation: {
                maxlength: 14,
            },
            deviceIpAddress: {
                maxlength: 15,
            },
            mobileNumberSuffix: {
                maxlength: 32,
            },
            accountIdHash: {
                maxlength: 64,
            },
            recommendationReasons: {},
            paymentDataType: {},
            enrolmentReferenceId: {
                maxlength: 256,
            },
            enrolmentReferenceType: {},
            authorization: {},
            verificationType: {},
            verificationEntity: {},
            verificationMethod: {},
            verificationResults: {},
            verificationTimestamp: {},
            additionalData: {},
            verificationEvents: {},

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

    // Listen to change for assurance fields
    [
        "#verificationType",
        "#verificationEntity",
        "#verificationMethod",
        "#verificationResults",
        "#verificationTimestamp",
        "#verificationEvents",
    ].forEach(function (sel) {
        $(document).on("change input", sel, updateAssuranceFieldRequirements);
    });
});
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#spinner").removeClass("loading");
    setDynamicDropdownValues();

    // Helper to build decisioningData
    function buildDecisioningData() {
        return {
            recommendation: $("#recommendation").val(),
            recommendationAlgorithmVersion: $(
                "#recommendationAlgorithmVersion"
            ).val(),
            deviceScore: $("#deviceScore").val(),
            accountScore: $("#accountScore").val(),
            deviceCurrentLocation: $("#deviceCurrentLocation").val(),
            deviceIpAddress: $("#deviceIpAddress").val(),
            mobileNumberSuffix: $("#mobileNumberSuffix").val(),
            accountIdHash: $("#accountIdHash").val(),
            recommendationReasons: $("input[name='recommendationReasons[]']")
                .map(function () {
                    return $(this).val().trim();
                })
                .get()
                .filter((code) => code !== ""),
        };
    }

    // Helper to build additionalDataRequested
    function buildAdditionalDataRequested() {
        return [
            {
                paymentDataType: $("#paymentDataType").val(),
            },
        ];
    }

    // Helper to build enrolmentReferenceData
    function buildEnrolmentReferenceData() {
        const enrolmentReferenceType = $("#enrolmentReferenceType").val();
        if (!enrolmentReferenceType) return null;
        const enrolmentReferenceId = $("#enrolmentReferenceId").val();
        const authorization = $("#authorization").val();
        const data = {
            enrolmentReferenceId: enrolmentReferenceId,
            enrolmentReferenceType: enrolmentReferenceType,
        };
        if (authorization && authorization.trim() !== "") {
            data.authorization = authorization;
        }
        return data;
    }

    // Helper to build requestData
    function buildRequestData(allVerificationData) {
        let requestData = {
            srcClientId: $("#srcClientId").val(),
            serviceId: $("#serviceId").val(),
            cardSource: $("#cardSource").val(),
            consumer: {
                consumerIdentity: {
                    identityType: $("#identityType").val(),
                    identityValue: $("#identityValue").val(),
                },
            },
        };

        if ($("#srcDpaId").val()) {
            requestData.srcDpaId = $("#srcDpaId").val();
        }

        if ($("#srcCorrelationId").val()) {
            requestData.srcCorrelationId = $("#srcCorrelationId").val();
        }

        if ($("#encryptedCard").val()) {
            requestData.encryptedCard = $("#encryptedCard").val();
        }

        if ($("#keyFingerprintId").val()) {
            requestData.keyFingerprintId = $("#keyFingerprintId").val();
        }

        if (allVerificationData.length > 0) {
            requestData.assuranceData = {
                verificationData: allVerificationData,
            };
        }

        const enrolmentReferenceData = buildEnrolmentReferenceData();
        if (enrolmentReferenceData) {
            requestData.enrolmentReferenceData = enrolmentReferenceData;
        }

        const decisioningData = buildDecisioningData();
        const additionalDataRequested = buildAdditionalDataRequested();

        let srcTokenRequestData = {};
        if (hasAnyValue(decisioningData)) {
            srcTokenRequestData.decisioningData = decisioningData;
        }
        if (hasAnyValue(additionalDataRequested)) {
            srcTokenRequestData.additionalDataRequested =
                additionalDataRequested;
        }
        if (Object.keys(srcTokenRequestData).length > 0) {
            requestData.srcTokenRequestData = srcTokenRequestData;
        }

        return requestData;
    }

    // Handle Create Funding Transfer form submission
    $("#card-enroll-form").on("submit", function (e) {
        e.preventDefault();

        const allVerificationData = collectAllVerificationData();

        if ($("#card-enroll-form").valid()) {
            let requestData = buildRequestData(allVerificationData);

            console.log("Request Data:", requestData);

            const xSrcCxFlowId = $("#xSrcCxFlowId").val();
            const xSrcResponseHost = $("#xSrcResponseHost").val();

            // Display request details
            displayResults("#requestBodyContent", requestData);

            // Show the loader
            showLoader();
            const requestHeaders = {
                "X-Src-Cx-Flow-Id": xSrcCxFlowId,
                "X-Src-Response-Host": xSrcResponseHost,
                "Content-Type": "application/json"
            };
            displayResults("#requestHeadersContent", requestHeaders);

            $.ajax({
                url: SERVER_URL + `/cards`,
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

    // Fetch configuration values from the backend
    $.get(SERVER_URL + "/api/config", function (data) {
        if (data.srcClientId) {
            $("#srcClientId").val(data.srcClientId).addClass("from-config");
        }
        if (data.serviceId) {
            $("#serviceId").val(data.serviceId).addClass("from-config");
        }
        if (data.identityType) {
            $("#identityType").val(data.identityType).addClass("from-config");
        }
        if (data.identityValue) {
            $("#identityValue").val(data.identityValue).addClass("from-config");
        }
        // Add others as needed
    });

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
                    $("#encryptedCard").val(response.data);
                    $("#encryptCardModal").modal("hide");
                },
                error: function (_jqXHR, _textStatus, _errorThrown) {
                    $("#spinner").removeClass("loading");
                },
            });
        }
    });

    // Add new block
    $("#add-verification-data-btn").on("click", function () {
        const template = $(getVerificationDataTemplate());
        setDynamicDropdownValuesForBlock(template);
        $("#verification-data-list").append(template);

        // Attach required logic for the block
        template.on("input change", `
        select[name="verificationType[]"],
        select[name="verificationEntity[]"],
        select[name="verificationMethod[]"],
        select[name="verificationResults[]"],
        input[name="verificationTimestamp[]"],
        select[name="verificationEvents[]"]
    `, function () {
            updateDynamicBlockRequired(template);
            $(this).valid(); // optional: validate as user types/selects
        });

        // Add validator rules to the required fields (on initial add)
        template.find('select[name="verificationType[]"],select[name="verificationEntity[]"],select[name="verificationMethod[]"],select[name="verificationResults[]"],input[name="verificationTimestamp[]"],select[name="verificationEvents[]"]').each(function () {
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
        'select[name="verificationEvents[]"]'
    ];

    // Check if any field (except additionalData) has value
    let anyValue = selectors.some(sel => {
        const $el = $block.find(sel);
        const val = $el.val();
        return val !== null && val !== "";
    });

    selectors.forEach(sel => {
        $block.find(sel).each(function () {
            const $el = $(this);
            $el.prop("required", anyValue);

            // Robustly add/remove required rule for validator
            if (anyValue) {
                if (!$el.data('rulesAdded')) {
                    $el.rules("add", { required: true });
                    $el.data('rulesAdded', true);
                }
            }
            if (!anyValue && $el.data('rulesAdded')) {
                try {
                    $el.rules("remove", "required");
                } catch (e) {
                    console.error("Failed to remove 'required' rule:", e);
                }
                $el.data('rulesAdded', false);
            }
        });
    });

    // Additional Data never required
    $block.find('input[name="additionalData[]"]').prop("required", false);

    // Add/Remove asterisks as needed
    markRequiredAsterisks($block);
}



