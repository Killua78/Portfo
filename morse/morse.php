<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Traduction en Morse</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 2rem auto;
            max-width: 600px;
            padding: 0 1rem;
            background: #f9f9f9;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #005f73;
        }
        form {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        textarea {
            resize: vertical;
            min-height: 100px;
            font-size: 1.1rem;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #0a9396;
            border: none;
            color: white;
            padding: 0.7rem;
            font-size: 1.1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.25s ease;
        }
        button:hover {
            background-color: #005f73;
        }
        pre {
            background: #e0fbfc;
            border: 1px solid #94d2bd;
            border-radius: 4px;
            padding: 1rem;
            font-size: 1.1rem;
            white-space: pre-wrap;
            word-wrap: break-word;
            margin-top: 1rem;
        }
        .error {
            color: #d90429;
            font-weight: bold;
            margin-top: 1rem;
        }
        /* --- Documentation Morse --- */
        #doc-morse {
            margin-top: 2rem;
            padding: 1rem;
            background: #caf0f8;
            border: 2px solid #48cae4;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #03045e;
        }
        #doc-morse h2 {
            text-align: center;
            margin-bottom: 0.7rem;
        }
        #doc-morse table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        #doc-morse th, #doc-morse td {
            border: 1px solid #48cae4;
            padding: 0.3rem 0.5rem;
            text-align: center;
        }
        #doc-morse th {
            background-color: #48cae4;
            color: white;
        }
        #doc-morse p {
            margin: 0.3rem 0;
        }
        @media (max-width: 400px) {
            #doc-morse table, #doc-morse th, #doc-morse td {
                font-size: 0.75rem;
            }
        }
    </style>
</head>
<body>

<h1>Traduction en Morse</h1>

<form method="post" action="">
    <textarea name="texte" placeholder="Entrez votre texte"><?php
        echo isset($_POST['texte']) ? htmlspecialchars($_POST['texte']) : '';
    ?></textarea>
    <button type="submit">Traduire</button>
</form>

<?php
$MORSE_CODE = [
    '.-'    => 'A',
    '-...'  => 'B',
    '-.-.'  => 'C',
    '-..'   => 'D',
    '.'     => 'E',
    '..-.'  => 'F',
    '--.'   => 'G',
    '....'  => 'H',
    '..'    => 'I',
    '.---'  => 'J',
    '-.-'   => 'K',
    '.-..'  => 'L',
    '--'    => 'M',
    '-.'    => 'N',
    '---'   => 'O',
    '.--.'  => 'P',
    '--.-'  => 'Q',
    '.-.'   => 'R',
    '...'   => 'S',
    '-'     => 'T',
    '..-'   => 'U',
    '...-'  => 'V',
    '.--'   => 'W',
    '-..-'  => 'X',
    '-.--'  => 'Y',
    '--..'  => 'Z',

    '-----' => '0',
    '.----' => '1',
    '..---' => '2',
    '...--' => '3',
    '....-' => '4',
    '.....' => '5',
    '-....' => '6',
    '--...' => '7',
    '---..' => '8',
    '----.' => '9',

    '.-.-.-' => '.',      
    '--..--' => ',',      
    '..--..' => '?',      
    '.----.' => "'",      
    '-.-.--' => '!',      
    '-..-.'  => '/',      
    '-.--.'  => '(',      
    '-.--.-' => ')',      
    '.-...'  => '&',      
    '---...' => ':',      
    '-.-.-.' => ';',      
    '-...-'  => '=',      
    '.-.-.'  => '+',      
    '-....-' => '-',      
    '..--.-' => '_',      
    '.-..-.' => '"',      
    '...-..-' => '$',     
    '.--.-.' => '@',      

    '.-.-'   => 'À',
    '--.-.'  => 'Ç',
    '..-..'  => 'É',
    '..--.'  => 'È',
    '.-..-'  => 'Ë',
    '.-..'   => 'L',
    '...-.'  => 'Ü',
    '---.'   => 'Ö',
    '--.--'  => 'Ñ',
];

function translateMorse(string $text): string {
    global $MORSE_CODE;
    $letterToMorse = array_flip($MORSE_CODE);

    $words = explode(' ', mb_strtoupper($text));
    $morseWords = [];

    foreach ($words as $word) {
        $morseLetters = [];
        $letters = mb_str_split($word);
        foreach ($letters as $letter) {
            $morseLetters[] = $letterToMorse[$letter] ?? '?';
        }
        $morseWords[] = implode(' ', $morseLetters);
    }
    return implode('   ', $morseWords);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = trim($_POST['texte'] ?? '');

    if (empty($input)) {
        echo '<p class="error">Veuillez entrer un texte à traduire.</p>';
    }else{
        $result = translateMorse($input);
        echo '<pre>' . htmlspecialchars($result) . '</pre>';
    }
}
?>

<!-- Documentation Morse -->
<section id="doc-morse" aria-label="Documentation et table de correspondance Morse">
    <h2>Documentation Morse</h2>
    <p>Le code Morse est un système de codage représentant les lettres, chiffres et certains signes de ponctuation avec des séries de <strong>points (.)</strong> et de <strong>tirets (-)</strong>.</p>
    <p>Chaque lettre ou chiffre est séparé par un espace, et les mots par trois espaces.</p>
    <table>
        <thead>
            <tr>
                <th>Lettre</th>
                <th>Morse</th>
                <th>Lettre</th>
                <th>Morse</th>
                <th>Chiffre</th>
                <th>Morse</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>A</td><td>.-</td><td>N</td><td>-.</td><td>0</td><td>-----</td></tr>
            <tr><td>B</td><td>-...</td><td>O</td><td>---</td><td>1</td><td>.----</td></tr>
            <tr><td>C</td><td>-.-.</td><td>P</td><td>.--.</td><td>2</td><td>..---</td></tr>
            <tr><td>D</td><td>-..</td><td>Q</td><td>--.-</td><td>3</td><td>...--</td></tr>
            <tr><td>E</td><td>.</td><td>R</td><td>.-.</td><td>4</td><td>....-</td></tr>
            <tr><td>F</td><td>..-.</td><td>S</td><td>...</td><td>5</td><td>.....</td></tr>
            <tr><td>G</td><td>--.</td><td>T</td><td>-</td><td>6</td><td>-....</td></tr>
            <tr><td>H</td><td>....</td><td>U</td><td>..-</td><td>7</td><td>--...</td></tr>
            <tr><td>I</td><td>..</td><td>V</td><td>...-</td><td>8</td><td>---..</td></tr>
            <tr><td>J</td><td>.---</td><td>W</td><td>.--</td><td>9</td><td>----.</td></tr>
            <tr><td>K</td><td>-.-</td><td>X</td><td>-..-</td><td></td><td></td></tr>
            <tr><td>L</td><td>.-..</td><td>Y</td><td>-.--</td><td></td><td></td></tr>
            <tr><td>M</td><td>--</td><td>Z</td><td>--..</td><td></td><td></td></tr>
        </tbody>
    </table>
    <p><strong>Quelques ponctuations :</strong></p>
    <p>. = <em>.-.-.-</em> | , = <em>--..--</em> | ? = <em>..--..</em> | ! = <em>-.-.--</em> | / = <em>-..-.</em></p>
    <p>Origine : Inventé au 19ème siècle, ce code permettait de transmettre des messages par signaux lumineux ou sonores.</p>
</section>

</body>
</html>
