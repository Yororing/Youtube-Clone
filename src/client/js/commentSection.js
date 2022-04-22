const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const { id } = videoContainer.dataset;

    // Prevent Blank Comment And Just Space
    if(text === "" || text.trim()=== "") {
        return;
    }

    const response = await fetch(`/api/videos/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });

    if(response.status === 201) {
        textarea.value = "";
    }

};

if(form) {
    form.addEventListener("submit", handleSubmit);
}
