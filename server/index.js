const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  const numericValues = data.filter(item => !isNaN(item));
  const alphabeticValues = data.filter(item => isNaN(item));

  const lowercaseLetters = alphabeticValues.filter(char => char === char.toLowerCase());
  const highestLowercaseLetter = lowercaseLetters.length ? [lowercaseLetters.sort().reverse()[0]] : [];

  let isFileValid = false;
  let fileMimeType = '';
  let fileSizeKB = 0;
  if (file_b64) {
    const fileBuffer = Buffer.from(file_b64, 'base64');
    fileSizeKB = fileBuffer.length / 1024;
    fileMimeType = 'image/png';
    isFileValid = true;
  }

  res.status(200).json({
    is_success: true,
    user_id: 'Rudra_shrinivas_kalyanpad_11052004',
    email: 'rudrakalyanpad84@gmail.com',
    roll_number: 'RA2111031010016',
    numbers: numericValues,
    alphabets: alphabeticValues,
    highest_lowercase_alphabet: highestLowercaseLetter,
    file_valid: isFileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB.toFixed(2)
  });
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});