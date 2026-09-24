// =========================================
// AI RESUME CHECKER - DASHBOARD JS
// =========================================


// =========================================
// DEMO DATA
// =========================================

const dashboardData = {

    totalCandidates: 300,

    eligibleCandidates: 187,

    averageEligibility: 71,

    highestEligibility: 96,


    jobRoles: {

        "Data Scientist": 62,

        "Data Analyst": 48,

        "AI/ML Engineer": 43,

        "Web Developer": 71,

        "Software Engineer": 76

    },


    eligibility: {

        "Highly Eligible": 82,

        "Eligible": 105,

        "Partially Eligible": 74,

        "Needs Improvement": 39

    },


    skills: {

        "Python": 82,

        "SQL": 76,

        "Java": 68,

        "Machine Learning": 61,

        "JavaScript": 55

    },


    experience: {

        "Fresher": 94,

        "1–2 Years": 87,

        "3–5 Years": 76,

        "5+ Years": 43

    }

};


// =========================================
// STATISTICS
// =========================================

document.getElementById("totalCandidates")
    .innerText =
    dashboardData.totalCandidates;


document.getElementById("eligibleCandidates")
    .innerText =
    dashboardData.eligibleCandidates;


document.getElementById("averageEligibility")
    .innerText =
    dashboardData.averageEligibility + "%";


document.getElementById("highestEligibility")
    .innerText =
    dashboardData.highestEligibility + "%";


// =========================================
// FIND MAX VALUE
// =========================================

function getMaximum(data) {

    return Math.max(
        ...Object.values(data)
    );

}


// =========================================
// CREATE BAR CHART
// =========================================

function createBars(
    containerId,
    data
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const maximum =
        getMaximum(data);


    Object.entries(data).forEach(
        ([label, value]) => {

            const barItem =
                document.createElement("div");

            barItem.className =
                "bar-item";


            const percentage =
                (value / maximum) * 100;


            barItem.innerHTML = `

                <div class="bar-label">

                    <span>
                        ${label}
                    </span>

                    <span>
                        ${value}
                    </span>

                </div>


                <div class="bar-background">

                    <div
                        class="bar-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>

            `;


            container.appendChild(barItem);

        }
    );

}


// =========================================
// CREATE ELIGIBILITY BARS
// =========================================

function createEligibilityBars() {

    const container =
        document.getElementById(
            "eligibilityChart"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const maximum =
        getMaximum(
            dashboardData.eligibility
        );


    Object.entries(
        dashboardData.eligibility
    ).forEach(
        ([label, value]) => {

            const percentage =
                (value / maximum) * 100;


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "eligibility-row";


            row.innerHTML = `

                <div class="eligibility-label">

                    ${label}

                </div>


                <div class="eligibility-bar">

                    <div
                        class="eligibility-fill"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <div class="eligibility-number">

                    ${value}

                </div>

            `;


            container.appendChild(row);

        }
    );

}


// =========================================
// INITIALIZE DASHBOARD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createBars(
            "jobChart",
            dashboardData.jobRoles
        );


        createEligibilityBars();


        createBars(
            "skillChart",
            dashboardData.skills
        );


        createBars(
            "experienceChart",
            dashboardData.experience
        );

    }
);