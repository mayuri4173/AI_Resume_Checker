let selectedMode = "image";


// ==========================================
// SELECT INPUT MODE
// ==========================================

function selectMode(mode) {

    selectedMode = mode;

    const imageBtn =
        document.getElementById("imageModeBtn");

    const manualBtn =
        document.getElementById("manualModeBtn");

    const bothBtn =
        document.getElementById("bothModeBtn");

    const imageSection =
        document.getElementById("imageSection");

    const manualSection =
        document.getElementById("resumeForm");


    // Remove active class

    imageBtn.classList.remove("active");
    manualBtn.classList.remove("active");
    bothBtn.classList.remove("active");


    // Hide sections

    imageSection.classList.remove("active");
    manualSection.classList.remove("active");


    // IMAGE

    if (mode === "image") {

        imageBtn.classList.add("active");

        imageSection.classList.add("active");

    }


    // MANUAL

    else if (mode === "manual") {

        manualBtn.classList.add("active");

        manualSection.classList.add("active");

    }


    // BOTH

    else if (mode === "both") {

        bothBtn.classList.add("active");

        imageSection.classList.add("active");

        manualSection.classList.add("active");

    }

}


// ==========================================
// FILE UPLOAD
// ==========================================

const resumeFile =
    document.getElementById("resumeFile");

const uploadBox =
    document.getElementById("uploadBox");

const fileName =
    document.getElementById("fileName");

const resumePreview =
    document.getElementById("resumePreview");


// File selected

resumeFile.addEventListener("change", function () {

    handleFile(this.files[0]);

});


// ==========================================
// HANDLE FILE
// ==========================================

function handleFile(file) {

    if (!file) {
        return;
    }


    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];


    if (!allowedTypes.includes(file.type)) {

        alert(
            "Please upload a JPG, JPEG or PNG image."
        );

        resumeFile.value = "";

        return;
    }


    fileName.textContent =
        "Selected: " + file.name;


    // Preview image

    const reader =
        new FileReader();


    reader.onload = function (event) {

        resumePreview.src =
            event.target.result;

        resumePreview.style.display =
            "block";

    };


    reader.readAsDataURL(file);

}


// ==========================================
// DRAG & DROP
// ==========================================

uploadBox.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        uploadBox.classList.add("dragover");

    }
);


uploadBox.addEventListener(
    "dragleave",
    function () {

        uploadBox.classList.remove("dragover");

    }
);


uploadBox.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();

        uploadBox.classList.remove("dragover");

        const file =
            event.dataTransfer.files[0];

        if (file) {

            resumeFile.files =
                event.dataTransfer.files;

            handleFile(file);

        }

    }
);


// ==========================================
// ANALYZE RESUME
// ==========================================

function analyzeResume() {

    const file =
        resumeFile.files[0];


    // --------------------------------------
    // IMAGE VALIDATION
    // --------------------------------------

    if (
        (selectedMode === "image" ||
         selectedMode === "both")
        &&
        !file
    ) {

        alert(
            "Please upload your resume image."
        );

        return;
    }


    // --------------------------------------
    // MANUAL VALUES
    // --------------------------------------

    const candidateName =
        document.getElementById("candidateName").value.trim();

    const targetJob =
        document.getElementById("targetJob").value;

    const education =
        document.getElementById("education").value;

    const experience =
        parseFloat(
            document.getElementById("experience").value
        ) || 0;

    const projects =
        parseInt(
            document.getElementById("projects").value
        ) || 0;

    const certifications =
        parseInt(
            document.getElementById("certifications").value
        ) || 0;

    const internship =
        document.getElementById("internship").value;

    const skills =
        document.getElementById("skills").value.trim();

    const resumeText =
        document.getElementById("resumeText").value.trim();


    // --------------------------------------
    // MANUAL VALIDATION
    // --------------------------------------

    if (
        selectedMode === "manual" ||
        selectedMode === "both"
    ) {

        if (!candidateName) {

            alert("Please enter candidate name.");

            return;
        }

        if (!targetJob) {

            alert("Please select target job.");

            return;
        }

        if (!education) {

            alert("Please select education.");

            return;
        }

        if (!skills) {

            alert("Please enter technical skills.");

            return;
        }

    }


    // --------------------------------------
    // DEMO SCORE
    // --------------------------------------

    let score = 0;


    // Image contribution

    if (file) {
        score += 20;
    }


    // Manual contribution

    if (candidateName) {
        score += 10;
    }

    if (targetJob) {
        score += 10;
    }

    if (education) {
        score += 10;
    }

    if (experience > 0) {
        score += 10;
    }

    if (projects > 0) {
        score += 10;
    }

    if (certifications > 0) {
        score += 5;
    }

    if (internship === "Yes") {
        score += 10;
    }

    if (skills) {
        score += 10;
    }

    if (resumeText) {
        score += 5;
    }


    // If nothing manually entered but image exists

    if (
        selectedMode === "image" &&
        file
    ) {

        score = 75;

    }


    // Limit score

    score =
        Math.min(score, 100);


    // ======================================
    // SAVE DATA
    // ======================================

    const candidateData = {

        inputMode: selectedMode,

        candidateName:
            candidateName || "Resume Candidate",

        targetJob:
            targetJob || "Not Provided",

        education:
            education || "Not Provided",

        experience:
            experience,

        projects:
            projects,

        certifications:
            certifications,

        internship:
            internship || "Not Provided",

        skills:
            skills || "Not Extracted",

        resumeText:
            resumeText || "Resume image uploaded.",

        resumeFileName:
            file ? file.name : "No image uploaded",

        score:
            score

    };


    localStorage.setItem(
        "candidateData",
        JSON.stringify(candidateData)
    );


    // ======================================
    // GO TO RESULT
    // ======================================

    window.location.href =
        "result.html";

}


// ==========================================
// INITIAL MODE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        selectMode("image");

    }
);