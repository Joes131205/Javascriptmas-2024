import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);
const elves = [];

async function generate(firstInitial, lastInitial) {
    if (!firstInitial || !lastInitial) {
        throw new Error("Please enter both first and last names");
    }

    try {
        const prompt = `Suggest 1 random name, including first and last name that matches with the first initial ${firstInitial} and second initial ${lastInitial}, that suitable to be elf name, and the name are excluded with this list of elf name = [${elves.join(", ") || "None"}]. Example output, with first initial : "J", and second initial: "S" : 'Joyful Snowdust' , without any explanation`;

        let generatedName = "";
        const stream = await hf.chatCompletionStream({
            model: "Qwen/Qwen2.5-72B-Instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 50,
            top_p: 0.9,
        });

        for await (const chunk of stream) {
            if (chunk.choices?.[0]?.delta?.content) {
                generatedName += chunk.choices[0].delta.content;
            }
        }

        return generatedName.trim().replace(/['"]/g, "");
    } catch (error) {
        console.error("Error generating name:", error);
        throw new Error("Failed to generate name. Please try again.");
    }
}

const input = document.querySelectorAll("input");
const generateBtn = document.querySelector("#generate-btn");
const elfNamesList = document.querySelector("#elf-names-list");
const elfNameDisplay = document.querySelector("#elf-name-display");

function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    generateBtn.textContent = isLoading ? "Generating..." : "Generate Elf Name";
}

generateBtn.addEventListener("click", async () => {
    try {
        setLoading(true);

        const firstNameInitial = input[0].value[0]?.toUpperCase();
        const lastNameInitial = input[1].value[0]?.toUpperCase();

        const elfName = await generate(firstNameInitial, lastNameInitial);

        if (!elves.includes(elfName)) {
            elves.push(elfName);
        }
        elfNameDisplay.textContent = elfName;
        elfNamesList.innerHTML = "";
        elves.forEach((elf) => {
            const li = document.createElement("li");
            li.textContent = elf;
            elfNamesList.appendChild(li);
        });
    } catch (error) {
        alert(error.message);
    } finally {
        setLoading(false);
    }
});
