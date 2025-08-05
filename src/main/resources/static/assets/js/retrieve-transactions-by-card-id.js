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
    // -------------------- Tab Click Logic --------------------
    $(".api-names-box").on("click", function (e) {
        const action = $(this).data("action");

        if (action === "RETRIEVE") {
            // Prevent navigation for RETRIEVE (tabbed view)
            e.preventDefault();

            window.history.replaceState({}, "", `?action=${action}`);
            $("#actionMode").val(action);
            $(".api-names-box").removeClass("active");
            $(this).addClass("active");
            $("h1").text(
                `${action.charAt(0).toUpperCase()}${action
                    .slice(1)
                    .toLowerCase()} Transactions`
            );
            // (Any other logic for ENROLL tab)
        }
    });

     markRequiredAsterisks(); // for initial load

    // -------------------- URL Parameter Handling --------------------
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const tabAction = getQueryParam("action");

    if (
        tabAction &&
        ["ENROLL", "GET", "DELETE", "RETRIEVE"].includes(tabAction.toUpperCase())
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
    $("#retrieve-transactions-by-card-id-form").validate({
        ignore: [],
        normalizer: function (value) {
            return value.trim();
        },
        rules: {
            cardId: {
                required: true,
            },
            srcClientId: {
                required: true,
                pattern:
                    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            },
            serviceId: {
                required: true,
            },
            srciTransactionId: {},
            transactionsFromTimestamp: {},
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

   
    // Handle Create Funding Transfer form submission
    $("#retrieve-transactions-by-card-id-form").on("submit", function (e) {
        e.preventDefault();

        if ($("#retrieve-transactions-by-card-id-form").valid()) {
            const cardId = $("#cardId").val();
            const srcClientId = $("#srcClientId").val();
            const serviceId = $("#serviceId").val();
            const srciTransactionId = $("#srciTransactionId").val();
            const transactionsFromTimestamp = $("#transactionsFromTimestamp").val();

            // Only include non-empty values in params
            const paramsObj = {
                srcClientId,
                serviceId,
                srciTransactionId,
                transactionsFromTimestamp
            };
            Object.keys(paramsObj).forEach(
                key => {
                    if (paramsObj[key] === null || paramsObj[key] === undefined || paramsObj[key] === '') {
                        delete paramsObj[key];
                    }
                }
            );
            const params = $.param(paramsObj);

            // Display request details

            // Build LOCAL API URL (not Mastercard directly)
            const URL = SERVER_URL + `/cards/${encodeURIComponent(cardId)}/transactions${params ? '?' + params : ''}`;

            displayResults("#requestBodyContent", URL);

            // Show the loader
            showLoader();
            const requestHeaders = {
                // add other headers here as needed
                "Content-Type": "application/json"
            };
            displayResults("#requestHeadersContent", requestHeaders);

            $.ajax({
                url: URL,
                type: "GET",
                contentType: "application/json",
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

    // Fetch configuration values from the backend
    $.get(SERVER_URL + "/api/config", function (data) {
        // Example: set input values if present in response
        if (data.srcClientId) {
            $("#srcClientId").val(data.srcClientId);
        }
        if (data.serviceId) {
            $("#serviceId").val(data.serviceId);
        }
        // You can add as many fields as needed
    });

});
