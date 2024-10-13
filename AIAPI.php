<?php
$ch = curl_init();


// Set the API URL
$url = "https://llm.kindo.ai/v1/chat/completions";

// Set your API key and model
$apiKey = "22c4e203-2032-43c9-9b0e-dfc88270b924-2e7e85682c16884d";  // Replace with your actual KINDO API key
$model = "claude-3-5-sonnet-20240620";      // Replace with the model name


// Prepare the data to send in the POST request
$data = array(
    'model' => $model,
    'messages' => array(
        array(
            'role' => 'user',
            // 'content' => 'does the microsoft graph api for outlook emails allow developers to access email content from the api?'
            'content' => 'hello! please just say hello back. thats it'
        )
    )
);

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'content-type: application/json',
    'api-key: ' . $apiKey
));

$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    echo 'cURL Error: ' . curl_error($ch);
} else {

    // echo $response; // Raw response
    // Decode the JSON response
    $responseData = json_decode($response, true);
    
    // Check if the response contains the expected data
    if (isset($responseData['choices']) && is_array($responseData['choices']) && !empty($responseData['choices'])) {
        $aiResponse = $responseData['choices'][0]['message']['content'];
        echo 'AI Response: ' . $aiResponse;
    } else {
        echo 'Unexpected response format or empty response.';
    }    
}


// Close the cURL session
curl_close($ch);
?>