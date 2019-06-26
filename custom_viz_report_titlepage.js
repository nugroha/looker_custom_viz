/**
 * This is a Custom Visualization for Looker
 *
 * It shows a full-width background image the first 2 dimension columns as a title and a subtitle
 *
 * CREATED BY: Egbert Schroeder
 *
 * DEPENDENCIES:
 *
 *
 * TODO:
 *
 **/

const customVizReportTitlePage = {
    /**
     * Configuration options
     *
     **/

    options: {
        backgroundImageUrl: {
            default: 'https://via.placeholder.com/1920x1080',
            label: "Background Image URL",
            order: 1,
            type: "string"
        },
    },

    /**
     * The create function gets called when the visualization is mounted but before any
     * data is passed to it.
     **/
    create: function (element, config) {
        // Insert Bootstrap css file
        element.innerHTML = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
             <style>
                body, html {
                    height: 100%;
                }

                /* The hero image */
                .hero-image {
                    /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
                    background-image: url(` + config.backgroundImageUrl + `);
                    /* Set a specific height */
                    height: 50%;
                    /* Position and center the image to scale nicely on all screens */
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    position: relative;
                }   

                /* Place text in the middle of the image */
                .hero-text {
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #ffffff;
                }
             </style>`;

        // Create a container element to let us center the text.
        this._vizContainer = element.appendChild(document.createElement("div"));
        this._vizContainer.className = "container-fluid";
    },

    /**
     * UpdateAsync is the function that gets called (potentially) multiple times. It receives
     * the data and should update the visualization with the new data.
     **/
    updateAsync: function (
        data,
        element,
        config,
        queryResponse,
        details,
        doneRendering
    ) {
        // Clear any errors from previous updates
        this.clearErrors();

        // Throw some errors and exit if the shape of the data isn't what this chart needs
        if (queryResponse.fields.dimensions.length < 2) {
            this.addError({
                title: "Not Enough Dimensions",
                message: "This visualisation requires 2 dimensions."
            });
            return;
        }

        // Select first row of data
        var firstRow = data[0];

        // Grab first column for the report title
        var title = firstRow[queryResponse.fields.dimensions[0].name];

        // Grab second column for the report subtitle/period
        var subTitle = firstRow[queryResponse.fields.dimensions[1].name];

        // Insert the data into text elements
        var html = '<div class="hero-image" style="background-image: url(` + config.backgroundImageUrl + `);">\n' +
            '  <div class="hero-text">\n' +
            '    <h1>I am John Doe</h1>\n' +
            '    <p>And I\'m a Photographer</p>\n' +
            '    <button>Hire me</button>\n' +
            '  </div>\n' +
            '</div>';

        // Insert the generated html into the page
        this._vizContainer.innerHTML = html;
        console.log(config.backgroundImageUrl);
        doneRendering();
    }
};

looker.plugins.visualizations.add(customVizReportTitlePage);
