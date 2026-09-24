// =========================================
// GET DATA FROM LOCAL STORAGE
// =========================================

const data = JSON.parse(
    localStorage.getItem("candidateData")
);


// =========================================
// CHECK DATA
// =========================================

if (!data) {

    window.location.href = "index.html";

}


// =========================================
// BASIC INFORMATION
// =========================================

document.getElementById("candidateName")
    .innerText = data.candidateName;

document.getElementById("targetJob")
    .innerText = data.targetJob;

document.getElementById("education")
    .innerText = data.education;

document.getElementById("experience")
    .innerText =
        data.experience + " years";

document.getElementById("projects")
    .innerText = data.projects;

document.getElementById("certifications")
    .innerText = data.certifications;

document.getElementById("internship")
    .innerText = data.internship;


// =========================================
// OVERALL SCORE
// =========================================

document.getElementById("score")
    .innerText = data.score + "%";


// =========================================
// STATUS
// =========================================

let statusText;

if (data.score >= 80) {

    statusText = "Highly Eligible";

}

else if (data.score >= 65) {

    statusText = "Eligible";

}

else if (data.score >= 50) {

    statusText = "Partially Eligible";

}

else {

    statusText = "Needs Improvement";

}

document.getElementById("status")
    .innerText = statusText;


// =========================================
// SKILL SCORE
// =========================================

const skillArray = data.skills
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill !== "");

const skillScore =
    Math.min(skillArray.length * 12, 100);

setMetric(
    "skillScore",
    "skillBar",
    skillScore
);


// =========================================
// EDUCATION SCORE
// =========================================

let educationScore = 75;

if (
    data.education.includes("B.Tech") ||
    data.education.includes("M.Tech") ||
    data.education.includes("MCA")
) {

    educationScore = 90;

}

setMetric(
    "educationScore",
    "educationBar",
    educationScore
);


// =========================================
// EXPERIENCE SCORE
// =========================================

const experienceScore =
    Math.min(
        data.experience * 20,
        100
    );

setMetric(
    "experienceScore",
    "experienceBar",
    experienceScore
);


// =========================================
// PROJECT SCORE
// =========================================

const projectScore =
    Math.min(
        data.projects * 15,
        100
    );

setMetric(
    "projectScore",
    "projectBar",
    projectScore
);


// =========================================
// CERTIFICATION SCORE
// =========================================

const certificationScore =
    Math.min(
        data.certifications * 20,
        100
    );

setMetric(
    "certificationScore",
    "certificationBar",
    certificationScore
);


// =========================================
// INTERNSHIP SCORE
// =========================================

const internshipScore =
    data.internship === "Yes"
        ? 100
        : 30;

setMetric(
    "internshipScore",
    "internshipBar",
    internshipScore
);


// =========================================
// MATCHED SKILLS
// =========================================

const matchedContainer =
    document.getElementById("matchedSkills");


skillArray.forEach(skill => {

    const tag =
        document.createElement("span");

    tag.className =
        "skill-tag matched-tag";

    tag.innerText =
        "✓ " + skill;

    matchedContainer.appendChild(tag);

});


// =========================================
// DEMO MISSING SKILLS
// =========================================

const jobSkills = {

    "Data Scientist": [
        "Python",
        "Machine Learning",
        "SQL",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "TensorFlow",
        "Statistics"
    ],

    "Data Analyst": [
        "Python",
        "SQL",
        "Excel",
        "Power BI",
        "Tableau",
        "Pandas",
        "Statistics"
    ],

    "AI/ML Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "NLP",
        "Computer Vision"
    ],

    "Web Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "Java",
        "React",
        "Node.js",
        "SQL",
        "Git"
    ],

    "Software Engineer": [
        "Java",
        "Python",
        "C++",
        "DSA",
        "OOP",
        "SQL",
        "Git",
        "Linux"
    ]

};


const requiredSkills =
    jobSkills[data.targetJob] || [];


const missingSkills =
    requiredSkills.filter(required => {

        return !skillArray.some(
            candidate =>
                candidate.toLowerCase()
                    === required.toLowerCase()
        );

    });


const missingContainer =
    document.getElementById("missingSkills");


if (missingSkills.length === 0) {

    const tag =
        document.createElement("span");

    tag.className =
        "skill-tag matched-tag";

    tag.innerText =
        "✓ No major missing skills";

    missingContainer.appendChild(tag);

}

else {

    missingSkills.forEach(skill => {

        const tag =
            document.createElement("span");

        tag.className =
            "skill-tag missing-tag";

        tag.innerText =
            "! " + skill;

        missingContainer.appendChild(tag);

    });

}


// =========================================
// RECOMMENDATION
// =========================================

const recommendation =
    document.getElementById("recommendation");


if (missingSkills.length === 0) {

    recommendation.innerText =
        "Your listed skills cover the main skills currently configured for this job role. Continue strengthening your projects and practical experience.";

}

else {

    recommendation.innerText =
        "Consider developing these skills: "
        + missingSkills.join(", ")
        + ". Adding relevant projects and certifications can also strengthen your profile.";

}


// =========================================
// FUNCTION FOR METRICS
// =========================================

function setMetric(
    textId,
    barId,
    value
) {

    value = Math.round(value);

    document.getElementById(textId)
        .innerText = value + "%";

    setTimeout(() => {

        document.getElementById(barId)
            .style.width = value + "%";

    }, 100);

}