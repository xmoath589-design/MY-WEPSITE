async function generateCareer() {
    const subject = document.getElementById('subject').value;
    const hobby = document.getElementById('hobby').value;
    const btn = document.getElementById('btn');
    const resultDiv = document.getElementById('result');
    const aiText = document.getElementById('ai-text');

    if(!subject || !hobby) return alert("تكفى عب البيانات أول!");

    btn.innerText = "جاري التحليل بعقل المليونير... 🧠";
    btn.disabled = true;

    // ملاحظة: في المشاريع الحقيقية لا تضع الـ API Key مباشرة هنا، لكن للبداية والتجربة سوي واحد من Google AI Studio
    const API_KEY = "AIzaSyBnxBG1BIUnMd28m85eFUA2IXzvCXRbQ8k"; 
    const prompt = `أنا طالب في الثانوية أحب مادة ${subject} وهوايتي ${hobby}. اقترح لي تخصص جامعي ومسار مهني يتوافق مع رؤية السعودية 2030 ويجعلني مليونير. اجعل الأسلوب حماسي ورهيب.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        resultDiv.classList.remove('hidden');
        aiText.innerText = text;
    } catch (error) {
        aiText.innerText = "حصل خطأ، تأكد من مفتاح الـ API يا وحش!";
    } finally {
        btn.innerText = "تحليل المسار المستقبلي ✨";
        btn.disabled = false;
    }
}