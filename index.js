<!DOCTYPE html>
<html dir="rtl">
<head>
  <title>SorTage V1.0 - سورتج ورژن اول</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Default Styles */
    body {
      background-color: #0f0f0f;
      color: #e0e0e0;
      font-family: 'Vazirmatn', sans-serif; /* Default Font */
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
      background-image: linear-gradient(to bottom, #1e1e1e, #0f0f0f); /* Default Background Gradient */
      padding: 0 20px;
      box-sizing: border-box;
      overflow-x: hidden;
      max-width: 100vw;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    h1, h2 {
      color: #00bcd4; /* Default Accent Color */
      text-shadow: 0 0 5px #00bcd4;
      margin-top: 30px;
      margin-bottom: 20px;
      text-align: center;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
    }

    .main-button, .action-button, .popup-button, .back-button {
      padding: 15px 30px;
      border: none;
      border-radius: 8px;
      background-color: #00bcd4; /* Default Button Color */
      color: #222;
      cursor: pointer;
      font-size: 1.2em;
      font-weight: bold;
      transition: background-color 0.3s ease;
      text-decoration: none;
      display: block;
      text-align: center;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    .main-button:hover, .action-button:hover, .popup-button:hover, .back-button:hover {
      background-color: #008699;
    }

    .popup-section-container {
      display: none;
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.6);
      justify-content: center;
      align-items: center;
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
      box-sizing: border-box;
    }

    .popup-section-content {
      background-image: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
      margin:  auto;
      padding: 25px;
      border-radius: 15px;
      width: 100%;
      box-shadow: 0 0 30px rgba(0, 188, 212, 0.9);
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      overflow: hidden;
      max-height: 90vh;
      overflow-y: auto;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
      min-height: 90vh;
    }
    .popup-section-content::before, .popup-section-content::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid transparent;
        border-radius: inherit;
        background: linear-gradient(to right, #00bcd4, transparent) border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        animation: border-rotate 6s linear infinite;
        z-index: -1;
        box-sizing: border-box;
    }
    .popup-section-content::after {
        animation-direction: reverse;
        background: linear-gradient(to bottom, #00bcd4, transparent) border-box;
        box-sizing: border-box;
    }
    @keyframes border-rotate {
        100% { transform: rotate(1turn); }
    }


    .popup-section-container.active {
      display: flex;
    }

    .popup-section-container.active .popup-section-content {
      opacity: 1;
      transform: scale(1);
    }
    .popup-section-container.active.popout .popup-section-content {
      opacity: 0;
      transform: scale(0.8);
    }


    .popup-message {
      color: #e0e0e0;
      font-size: 1.2em;
      text-align: center;
      margin-bottom: 25px;
      padding: 0 20px;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    .popup-buttons {
      display: flex;
      gap: 20px;
      box-sizing: border-box;
    }

    .popup-button {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    .popup-button.ok-button {
      background-color: #f44336;
      color: #fff;
      box-sizing: border-box;
    }
    .popup-button.ok-button:hover {
      background-color: #d32f2f;
    }

    .popup-button.cancel-button {
      background-color: #6c757d;
      color: #fff;
      box-sizing: border-box;
    }
    .popup-button.cancel-button:hover {
      background-color: #5a6268;
    }


    #chatbot-section,
    #product-management-section,
    #customization-section { /* Include customization section */
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      box-sizing: border-box;
      min-height: 90vh;
    }
    #landing-page-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }


    /* Chatbot Styles (within its section) */
    #chatbot-section {
      box-sizing: border-box;
    }

    #model-selection {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
    }

    #model-selection label {
      margin-right: 10px;
      color: #ccc;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    #model-select {
      padding: 8px 12px;
      border: 1px solid #555;
      border-radius: 5px;
      background-color: #333;
      color: #f0f0f0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
      background-repeat: no-repeat;
      background-position-x: 10px; /* Adjusted for RTL */
      background-position-y: 5px;
      flex-grow: 1;
      min-width: 0;
      box-sizing: border-box;
      direction: ltr; /* Ensure dropdown arrow is on the left in RTL */
      padding-right: 30px; /* Make space for the dropdown arrow in RTL */
      background-position-x: calc(100% - 10px); /* Position arrow on the left */
    }

    #model-select:focus {
      border-color: #00bcd4;
      box-shadow: 0 0 5px rgba(0, 188, 212, 0.5);
      outline: none;
      box-sizing: border-box;
    }

    #chat-container {
      border: 1px solid #444;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      background-color: #2a2a2a;
      overflow-y: auto;
      max-height: 600px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .message {
      padding: 12px 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      word-wrap: break-word;
      align-self: flex-start;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    .user-message {
      background-color: #555;
      color: #f8f0f8;
      text-align: right;
      border-radius: 8px 2px 8px 8px;
      align-self: flex-end;
      box-sizing: border-box;
    }

    .bot-message {
      background-color: #00bcd4;
      color: #222;
      text-align: left;
      border-radius: 2px 8px 8px 8px;
      align-self: flex-start;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    #input-area {
      display: flex;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      overflow: hidden;
      margin-top: auto;
      box-sizing: border-box;
    }

    #user-input {
      flex-grow: 1;
      padding: 12px;
      border: none;
      border-radius: 0 8px 8px 0; /* Adjusted for RTL */
      border-radius: 0 8px 8px 0;
      background-color: #333;
      color: #f0f0f0;
      font-size: 1em;
      box-sizing: border-box;
      direction: ltr; /* Keep input text LTR for numbers */
      text-align: left; /* Keep input text LTR for numbers */
      font-family: inherit; /* Inherit font from body */
    }

    #user-input:focus {
      outline: none;
      box-shadow: inset 0 0 5px rgba(0, 188, 212, 0.3);
      box-sizing: border-box;
    }

    #send-button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px 0 0 8px; /* Adjusted for RTL */
      border-radius: 0 8px 8px 0;
      background-color: #00bcd4;
      color: #222;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    #send-button:hover {
      background-color: #008699;
    }

    .loading-indicator {
        display: none;
        margin-left: 15px; /* Keep margin-left for loading indicator */
        font-size: 1.4em;
        color: #00bcd4;
        animation: blinker 1s linear infinite;
        box-sizing: border-box;
    }

    @keyframes blinker {
        50% { opacity: 0.5; }
    }

    /* Product Management Styles (within its section) */
    #product-management-section {
      box-sizing: border-box;
    }

    .section-container {
      margin-bottom: 30px;
      padding: 15px;
      background-color: #2a2a2a;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    .section-title {
      color: #00bcd4;
      margin-bottom: 15px;
      border-bottom: 1px solid #444;
      padding-bottom: 5px;
      text-align: center;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    .form-group {
      margin-bottom: 15px;
      width: 100%;
      box-sizing: border-box;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #ccc;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
    }

    .form-group input {
      width: calc(100% - 24px);
      padding: 12px;
      border: 1px solid #555;
      border-radius: 8px;
      background-color: #333;
      color: #f0f0f0;
      font-size: 1em;
      box-sizing: border-box;
      direction: ltr; /* Keep input text LTR for numbers */
      text-align: left; /* Keep input text LTR for numbers */
      font-family: inherit; /* Inherit font from body */
    }


    .action-button {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      background-color: #00bcd4;
      color: #222;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
      font-size: 1.1em;
      align-self: center;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    .action-button:hover {
      background-color: #008699;
    }

    #product-list-container {
      overflow-x: auto;
      margin-bottom: 20px;
      width: 100%;
      max-height: 480px; /* Increased by 20% from 400px */
      overflow-y: auto;
      box-sizing: border-box;
    }

    #product-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      box-sizing: border-box;
    }

    #product-table th, #product-table td {
      border: 1px solid #444;
      padding: 12px 10px; /* Increased padding slightly */
      text-align: right; /* Right align table cells for Persian */
      font-size: 1.15em; /* Increased by 20% from 0.95em */
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    #product-table th {
      background-color: #333;
      color: #e0e0e0;
      box-sizing: border-box;
      text-align: right; /* Right align table headers for Persian */
    }
    #product-table td {
      background-color: #2a2a2a;
      box-sizing: border-box;
    }

    /* Style for the container of action buttons */
    #product-table td .table-actions {
        display: flex; /* Enable flexbox */
        flex-direction: row-reverse; /* Arrange items from right to left in RTL */
        justify-content: flex-start; /* Align items to the start (right in RTL) */
        gap: 10px; /* Define the space between buttons */
    }

    /* Style for the buttons themselves (inside .table-actions) - simplified */
    #product-table td .table-actions .action-button {
        /* Keep essential button styles, remove spacing */
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        background-color: #00bcd4;
        color: #222;
        cursor: pointer;
        font-size: 0.9em;
        font-weight: bold;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 188, 212, 0.5);
        box-sizing: border-box;
        margin-right: 0; /* Ensure no margin on the buttons themselves */
        font-family: inherit; /* Inherit font from body */
    }


    /* Hover effect - Slightly darker cyan and stronger shadow */
    #product-table td .table-actions .action-button:hover { /* Applying hover to buttons inside .table-actions */
      background-color: #00a1b3;
      box-shadow: 0 3px 6px rgba(0, 188, 212, 0.7);
      box-sizing: border-box;
    }


    .search-bar-container {
      display: flex;
      margin-bottom: 20px;
      width: 100%;
      box-sizing: border-box;
      flex-direction: column; /* Stack search and sort options */
      align-items: flex-start; /* Align items to the start (right in RTL) */
    }

    .search-bar-container input[type="text"] {
      flex-grow: 1;
      margin-right: 0px; /* Removed margin-right from search input */
      margin-left: 0; /* Reset margin-left if any */
      padding: 12px;
      border-radius: 8px; /* Adjusted for RTL - No rounded corners on the right */
      box-sizing: border-box;
      direction: ltr; /* Keep search input LTR for numbers */
      text-align: left; /* Keep search input LTR for numbers */
      font-family: inherit; /* Inherit font from body */
      width: 100%; /* Make search input full width */
    }

    .sort-options {
      display: flex;
      gap: 10px;
      margin-top: 10px; /* Add some space between search and sort options */
      box-sizing: border-box;
    }

    .sort-button {
      padding: 8px 15px;
      border: 1px solid #555;
      border-radius: 8px;
      background-color: #333;
      color: #f0f0f0;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.3s ease;
      box-sizing: border-box;
      font-family: inherit; /* Inherit font from body */
      display: flex; /* Enable flex for icon and text alignment */
      align-items: center; /* Vertically align icon and text */
      justify-content: center; /* Center content horizontally */
      white-space: nowrap; /* Prevent text wrapping */
    }

    .sort-button:hover {
      background-color: #555;
    }


    .backup-buttons-container {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      justify-content: center;
      flex-wrap: wrap;
      box-sizing: border-box;
    }
    .backup-buttons-container button {
        padding: 12px 20px;
        box-sizing: border-box;
        font-family: inherit; /* Inherit font from body */
    }

    .back-button {
      margin-top: 30px;
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      background-color: #555;
      color: #f0f0f0;
      cursor: pointer;
      text-decoration: none;
      font-size: 1.1em;
      box-sizing: border-box;
       -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-shadow: 0 0 0 transparent;
      font-family: inherit; /* Inherit font from body */
    }

    .back-button:hover {
      background-color: #777;
      box-sizing: border-box;
    }

    .hidden-section {
        display: none;
        box-sizing: border-box;
    }


    /* Backup List Styles */
    #backup-list {
        margin-top: 15px;
        padding: 15px;
        border: 1px solid #444;
        border-radius: 8px;
        background-color: #333;
        color: #f0f0f0;
        max-height: 200px;
        overflow-y: auto;
        white-space: pre-line;
        font-family: monospace;
        font-size: 0.9em;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        direction: ltr; /* Keep backup list LTR for filenames */
        text-align: left; /* Keep backup list LTR for filenames */
    }

    /* Customization Section Styles */
    #customization-section {
        box-sizing: border-box;
    }

    .color-options {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    .color-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        transition: transform 0.2s ease;
        box-sizing: border-box;
    }

    .color-button:hover {
        transform: scale(1.1);
    }

    .color-green { background: linear-gradient(135deg, #2E7D32, #4CAF50); } /* Darker Green */
    .color-blue { background: linear-gradient(135deg, #0D47A1, #1976D2); } /* Darker Blue */
    .color-red { background: linear-gradient(135deg, #B71C1C, #D32F2F); } /* Darker Red */
    .color-yellow { background: linear-gradient(135deg, #F9A825, #FFEB3B); } /* Darker Yellow */


    .font-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        box-sizing: border-box;
    }

    .font-button {
        padding: 10px 20px;
        border: 1px solid #555;
        border-radius: 8px;
        background-color: #333;
        color: #f0f0f0;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s ease, color 0.3s ease;
        box-sizing: border-box;
        min-width: 150px;
        text-align: center;
        font-family: inherit; /* Inherit font from body */
    }

    .font-button:hover {
        background-color: #555;
        color: #fff;
    }

    /* Color Themes - Apply to body to override defaults */
    body.color-green { background-image: linear-gradient(to bottom, #1B5E20, #003300); } /* Even Darker Green */
    body.color-green h1, body.color-green h2, body.color-green .action-button, body.color-green .main-button, body.color-green .popup-button, body.color-green #send-button {
        color: #B2FF59; /* Brighter Green Text */
        text-shadow: 0 0 5px #B2FF59;
        background-color: #388E3C; /* Darker Green Button */
    }
    body.color-green .action-button:hover, body.color-green .main-button:hover, body.color-green .popup-button:hover, body.color-green #send-button:hover {
        background-color: #1B5E20; /* Even Darker Green Hover */
    }
    body.color-green .popup-section-content::before, body.color-green .popup-section-content::after {
        background: linear-gradient(to right, #388E3C, transparent) border-box;
    }
    body.color-green .popup-section-content::after {
        background: linear-gradient(to bottom, #388E3C, transparent) border-box;
    }
    body.color-green .loading-indicator { color: #388E3C; }

    body.color-blue { background-image: linear-gradient(to bottom, #0D47A1, #002171); } /* Even Darker Blue */
    body.color-blue h1, body.color-blue h2, body.color-blue .action-button, body.color-blue .main-button, body.color-blue .popup-button, body.color-blue #send-button {
        color: #81D4FA; /* Brighter Blue Text */
        text-shadow: 0 0 5px #81D4FA;
        background-color: #1565C0; /* Darker Blue Button */
    }
    body.color-blue .action-button:hover, body.color-blue .main-button:hover, body.color-blue .popup-button:hover, body.color-blue #send-button:hover {
        background-color: #0D47A1; /* Even Darker Blue Hover */
    }
    body.color-blue .popup-section-content::before, body.color-blue .popup-section-content::after {
        background: linear-gradient(to right, #1565C0, transparent) border-box;
    }
    body.color-blue .popup-section-content::after {
        background: linear-gradient(to bottom, #1565C0, transparent) border-box;
    }
    body.color-blue .loading-indicator { color: #1565C0; }


    body.color-red { background-image: linear-gradient(to bottom, #B71C1C, #7F0000); } /* Even Darker Red */
    body.color-red h1, body.color-red h2, body.color-red .action-button, body.color-red .main-button, body.color-red .popup-button, body.color-red #send-button {
        color: #FF8A80; /* Brighter Red Text */
        text-shadow: 0 0 5px #FF8A80;
        background-color: #D32F2F; /* Darker Red Button */
    }
    body.color-red .action-button:hover, body.color-red .main-button:hover, body.color-red .popup-button:hover, body.color-red #send-button:hover {
        background-color: #B71C1C; /* Even Darker Red Hover */
    }
    body.color-red .popup-section-content::before, body.color-red .popup-section-content::after {
        background: linear-gradient(to right, #D32F2F, transparent) border-box;
    }
    body.color-red .popup-section-content::after {
        background: linear-gradient(to bottom, #D32F2F, transparent) border-box;
    }
    body.color-red .loading-indicator { color: #D32F2F; }

    body.color-yellow { background-image: linear-gradient(to bottom, #F9A825, #FF6F00); } /* Darker Yellow/Orange */
    body.color-yellow h1, body.color-yellow h2, body.color-yellow .action-button, body.color-yellow .main-button, body.color-yellow .popup-button, body.color-yellow #send-button {
        color: #FFFF8D; /* Brighter Yellow Text */
        text-shadow: 0 0 5px #FFFF8D;
        background-color: #FFC107; /* Darker Yellow Button */
    }
    body.color-yellow .action-button:hover, body.color-yellow .main-button:hover, body.color-yellow .popup-button:hover, body.color-yellow #send-button:hover {
        background-color: #F9A825; /* Darker Yellow Hover */
    }
    body.color-yellow .popup-section-content::before, body.color-yellow .popup-section-content::after {
        background: linear-gradient(to right, #FFC107, transparent) border-box;
    }
    body.color-yellow .popup-section-content::after {
        background: linear-gradient(to bottom, #FFC107, transparent) border-box;
    }
    body.color-yellow .loading-indicator { color: #FFC107; }


    /* Font Themes - Apply to body to override defaults */
    body.font-vazirmatn { font-family: 'Vazirmatn', sans-serif; }
    body.font-shabnam { font-family: 'Shabnam', sans-serif; }
    body.font-byekan { font-family: 'B Yekan', sans-serif; }
    body.font-samim { font-family: 'Samim', sans-serif; }
    body.font-vazin { font-family: 'Vazin', sans-serif; }
    body.font-dana { font-family: 'Dana', sans-serif; }
    body.font-iransans { font-family: 'IranSans', sans-serif; }
    body.font-droidarabicnaskh { font-family: 'Droid Arabic Naskh', serif; }
    body.font-tahoma { font-family: Tahoma, sans-serif; }
    body.font-arial { font-family: Arial, sans-serif; }


    /* Media Query for larger screens - Adjust layout for screens wider than 768px */
    @media screen and (min-width: 768px) {
        body {
            padding: 0 50px;
            box-sizing: border-box;
        }
        #landing-page-section, #chatbot-popup, #product-management-popup, #customization-popup { /* Include customization popup */
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
        }
        .button-container, .popup-section-content {
            width: 100%;
            box-sizing: border-box;
        }


        /* Example: Side-by-side layout for Product Management on larger screens */
        #product-management-section, #customization-section { /* Include customization section */
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
            box-sizing: border-box;
        }
        .section-container {
            width: calc(50% - 30px);
            margin-right: 30px; /* Keep margin-right for section containers */
            margin-left: 0; /* Reset margin-left if any */
            margin-bottom: 20px;
            min-width: 350px;
            box-sizing: border-box;
        }
        /* Ensure product list takes full width in two-column layout */
        #product-list-container {
            width: 100%;
            box-sizing: border-box;
        }
    }

    /* Font for Persian text - Vazirmatn (you may need to include the font in your project) */
    @font-face {
        font-family: 'Vazirmatn';
        src: url('https://cdn.jsdelivr.net/npm/vazirmatn@33.0.3/Vazirmatn-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap; /* Use swap to prevent FOIT */
    }
    @font-face {
        font-family: 'Shabnam';
        src: url('https://cdn.jsdelivr.net/npm/shabnam-font@latest/dist/font-face.woff2') format('woff2'),
             url('https://cdn.jsdelivr.net/npm/shabnam-font@latest/dist/font-face.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'B Yekan';
        src: url('https://cdn.fontcdn.ir/Font/Persian/BYekan/BYekan.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Samim';
        src: url('https://cdn.fontcdn.ir/Font/Persian/Samim/Samim.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Vazin';
        src: url('https://cdn.fontcdn.ir/Font/Persian/Vazin/Vazin.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Dana'; /* Example - Replace with actual font URL if needed */
        src: local('Dana-Regular'), local('Dana'); /* Example - Adjust src as needed */
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'IranSans'; /* Example - Replace with actual font URL if needed */
        src: local('IranSans'), local('Iran-Sans'); /* Example - Adjust src as needed */
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Droid Arabic Naskh';
        src: url('https://fonts.googleapis.com/earlyaccess/droidarabicnaskh.css') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }


  </style>
</head>
<body dir="rtl"> <!-- Set body direction to RTL -->
  <h1>سورتج ورژن یک</h1> <!-- SorTage V1.0 -->

  <div id="landing-page-section">
    <div class="button-container">
      <button class="main-button" onclick="showChatbotSection()">پرسش از هوش مصنوعی</button> <!-- Ask AI -->
      <button class="main-button" onclick="showProductManagementSection()">مدیریت محصولات</button> <!-- Product Management -->
      <button class="main-button" onclick="showCustomizationSection()">سفارشی سازی</button> <!-- Customization Button -->
    </div>
  </div>

  <div id="chatbot-popup" class="popup-section-container">
    <div class="popup-section-content">
      <div id="chatbot-section">
        <div id="model-selection">
          <label for="model-select">انتخاب مدل:</label> <!-- Choose Model -->
          <select id="model-select">
            <option value="gemini">Gemini Pro</option>
            <option value="deepseek">DeepSeek</option>
            <option value="grok">Grok AI</option>
          </select>
        </div>

        <div id="chat-container">
          <div class="message bot-message">خوش آمدید! من سورتج هستم، دستیار کدنویسی شما هستم. هر سوالی دارید بپرسید!</div> <!-- Welcome! I'm SorTage, your coding helper. Ask me anything! -->
        </div>
        <div id="input-area">
          <input type="text" id="user-input" placeholder="سوال کدنویسی خود را تایپ کنید..." /> <!-- Type your coding question... -->
          <button id="send-button">ارسال</button> <!-- Send -->
          <span id="loading-indicator" class="loading-indicator">...</span>
        </div>
        <button class="back-button" onclick="showLandingPage()">بازگشت به صفحه اصلی</button> <!-- Back to Home -->
      </div>
    </div>
  </div>


  <div id="product-management-popup" class="popup-section-container">
    <div class="popup-section-content">
      <div id="product-management-section">
        <div class="section-container">
          <h2 class="section-title">افزودن محصول</h2> <!-- Add Product -->
          <div class="form-group">
            <label for="product-name">نام محصول:</label> <!-- Product Name -->
            <input type="text" id="product-name" placeholder="نام محصول را وارد کنید"> <!-- Enter product name -->
          </div>
          <div class="form-group">
            <label for="product-price">قیمت محصول:</label> <!-- Product Price -->
            <input type="text" id="product-price" placeholder="قیمت محصول را وارد کنید" oninput="formatPriceInput(this)"> <!-- Enter product price -->
          </div>
          <button id="addProductButton" class="action-button" onclick="addProduct()">افزودن محصول</button> <!-- Add Product -->
        </div>

        <div class="section-container">
          <h2 class="section-title">جستجو محصولات</h2> <!-- Search Products -->
          <div class="search-bar-container">
            <input type="text" id="search-input" placeholder="جستجو محصولات بر اساس نام یا قیمت"> <!-- Search products by name or price -->
            <div class="sort-options">
                <button class="sort-button" onclick="sortTable('price', 'asc')">💰 کمترین قیمت</button>
                <button class="sort-button" onclick="sortTable('price', 'desc')">💸 بیشترین قیمت</button>
                <button class="sort-button" onclick="sortTable('name', 'asc')">🇦-🇿 نام</button>
                <button class="sort-button" onclick="sortTable('name', 'desc')">🇿-🇦 نام</button>
            </div>
          </div>
        </div>

        <div class="section-container" id="product-list-container">
          <h2 class="section-title">لیست محصولات</h2> <!-- Product List -->
          <table id="product-table">
            <thead>
              <tr>
                <th>نام</th> <!-- Name -->
                <th>قیمت</th> <!-- Price -->
                <th>تاریخ اضافه شدن</th> <!-- Date Added -->
                <th>عملیات</th> <!-- Actions -->
              </tr>
            </thead>
            <tbody id="product-table-body">
              <!-- Product rows will be added here by JavaScript -->
            </tbody>
          </table>
        </div>

        <div class="section-container">
          <h2 class="section-title">پشتیبان گیری و بازیابی</h2> <!-- Backup & Restore -->
          <div class="backup-buttons-container">
            <button class="action-button" onclick="createBackup()">ایجاد پشتیبان</button> <!-- Create Backup -->
            <button class="action-button" onclick="listBackups()">لیست پشتیبان ها</button> <!-- List Backups -->
            <button class="action-button" onclick="restoreBackupMenu()">بازیابی پشتیبان</button> <!-- Restore Backup -->
            <button class="action-button" onclick="deleteBackupMenu()">حذف پشتیبان</button> <!-- Delete Backup -->
          </div>
          <div id="backup-message-area">
              <div id="backup-list">
                  <!-- Backup list will be displayed here -->
              </div>
          </div>
        </div>

        <button class="back-button" onclick="showLandingPage()">بازگشت به صفحه اصلی</button> <!-- Back to Home -->
      </div>

      <!-- Custom Delete Confirmation Popup -->
      <div id="delete-confirm-popup" class="popup-section-container">
          <div class="popup-section-content">
              <h2 class="popup-message">آیا مطمئن هستید که می خواهید این محصول را حذف کنید؟</h2> <!-- Are you sure you want to delete this product? -->
              <div class="popup-buttons">
                  <button class="popup-button ok-button" onclick="confirmDeleteProduct()">تایید</button> <!-- OK -->
                  <button class="popup-button cancel-button" onclick="cancelDeleteProduct()">انصراف</button> <!-- Cancel -->
              </div>
          </div>
      </div>

      <!-- Edit Product Popup -->
      <div id="edit-product-popup" class="popup-section-container">
          <div class="popup-section-content">
              <h2 class="popup-message">ویرایش جزئیات محصول</h2> <!-- Edit Product Details -->
              <div class="form-group">
                  <label for="edit-product-name">نام محصول:</label> <!-- Product Name -->
                  <input type="text" id="edit-product-name" placeholder="نام جدید محصول را وارد کنید"> <!-- Enter new product name -->
              </div>
              <div class="form-group">
                  <label for="edit-product-price">قیمت محصول:</label> <!-- Product Price -->
                  <input type="text" id="edit-product-price" placeholder="قیمت جدید محصول را وارد کنید"> <!-- Enter new product price -->
              </div>
              <div class="popup-buttons">
                  <button class="popup-button ok-button" onclick="confirmEditProduct()">تایید</button> <!-- OK -->
                  <button class="popup-button cancel-button" onclick="cancelEditProductPopup()">انصراف</button> <!-- Cancel -->
              </div>
          </div>
      </div>

    </div>
  </div>

  <div id="customization-popup" class="popup-section-container">
    <div class="popup-section-content">
      <div id="customization-section">
        <h2 class="section-title">سفارشی سازی ظاهر</h2> <!-- Customize Appearance -->

        <div class="section-container">
          <h3 class="section-title">انتخاب رنگ قالب</h3> <!-- Choose Theme Color -->
          <div class="color-options">
            <button class="color-button color-green" onclick="applyColorTheme('green')" title="سبز"></button> <!-- Green -->
            <button class="color-button color-blue" onclick="applyColorTheme('blue')" title="آبی"></button> <!-- Blue -->
            <button class="color-button color-red" onclick="applyColorTheme('red')" title="قرمز"></button> <!-- Red -->
            <button class="color-button color-yellow" onclick="applyColorTheme('yellow')" title="زرد"></button> <!-- Yellow -->
          </div>
        </div>

        <div class="section-container">
          <h3 class="section-title">انتخاب فونت</h3> <!-- Choose Font -->
          <div class="font-options">
            <button class="font-button" onclick="applyFont('Vazirmatn')" style="font-family: 'Vazirmatn', sans-serif;">وزیرمتن</button>
            <button class="font-button" onclick="applyFont('Shabnam')" style="font-family: 'Shabnam', sans-serif;">شبنم</button>
            <button class="font-button" onclick="applyFont('BYekan')" style="font-family: 'B Yekan', sans-serif;">بی یکان</button>
            <button class="font-button" onclick="applyFont('Samim')" style="font-family: 'Samim', sans-serif;">صمیم</button>
            <button class="font-button" onclick="applyFont('Vazin')" style="font-family: 'Vazin', sans-serif;">وزین</button>
            <button class="font-button" onclick="applyFont('Dana')" style="font-family: 'Dana', sans-serif;">دانا</button>
            <button class="font-button" onclick="applyFont('IranSans')" style="font-family: 'IranSans', sans-serif;">ایران‌سنس</button>
            <button class="font-button" onclick="applyFont('Droid Arabic Naskh')" style="font-family: 'Droid Arabic Naskh', serif;">دروید عربی نسخ</button>
            <button class="font-button" onclick="applyFont('Tahoma')" style="font-family: Tahoma, sans-serif;">تاماها</button>
            <button class="font-button" onclick="applyFont('Arial')" style="font-family: Arial, sans-serif;">آریال</button>
          </div>
        </div>

        <button class="back-button" onclick="showLandingPage()">بازگشت به صفحه اصلی</button> <!-- Back to Home -->
      </div>
    </div>
  </div>


  <script>
    // ** FIREBASE CONFIGURATION - PUBLIC URL - NO API KEY NEEDED **
    const FIREBASE_URL = "https://publiclavazemkamionreloaded-default-rtdb.firebaseio.com/";

    // ** API KEYS for Chatbot Models (Still needed for Chatbot Functionality) **
    const GEMINI_API_KEY = "AIzaSyCiiRGnNb-w_jJ-5QLZQm6kF98XDCNcccc"; //  <---  SET YOUR GEMINI API KEY HERE!
    const DEEPSEEK_API_KEY = "sk-8dfd5305b4c54bb90baed1cd24d6605"; // <--- SET YOUR DEEPSEEK API KEY HERE!
    const GROK_API_KEY = "xai-m3Y78bID5F4FtJOtD31AZjoXVeRg1SnZeZ8tT53Yls37h21rlhCUUY10DmwX8rt5bE1TM6DqJmdRcWhS"; // <--- SET YOUR GROK API KEY HERE!

    // **SECURITY WARNING:**  Storing API keys directly in frontend JavaScript is NOT recommended for production applications.
    // API keys should be handled securely on a backend server to prevent exposure.
    // This example is for demonstration purposes only.

    if (!GEMINI_API_KEY || GEMINI_API_KEY == "REPLACE_WITH_YOUR_GEMINI_API_KEY") {
        console.error("Error: GEMINI_API_KEY is missing or not correctly configured. Please set it directly in the script.");
        alert("خطا: کلید API جیمینی وارد نشده یا به درستی پیکربندی نشده است. لطفا آن را مستقیماً در اسکریپت تنظیم کنید."); // Error: GEMINI_API_KEY is missing or not correctly configured. Please set it directly in the script.
    }
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY == "REPLACE_WITH_YOUR_DEEPSEEK_API_KEY") {
        console.warn("Warning: DEEPSEEK_API_KEY is missing or not correctly configured. DeepSeek model will not function.");
        alert("هشدار: کلید API دیپ‌سیک وارد نشده یا به درستی پیکربندی نشده است. مدل دیپ‌سیک کار نخواهد کرد."); // Warning: DEEPSEEK_API_KEY is missing or not correctly configured. DeepSeek model will not function.
    }
    if (!GROK_API_KEY ) { // Grok API Key check - no placeholder needed as it's provided
        console.warn("Warning: GROK_API_KEY is missing or not correctly configured. Grok AI model may not function.");
        alert("هشدار: کلید API گروک وارد نشده یا به درستی پیکربندی نشده است. مدل Grok AI ممکن است کار نکند."); // Warning: GROK_API_KEY is missing or not correctly configured. Grok AI model may not function.
    }

    // -------------------- Helper Functions (from Telegram Bot - adapted for JS) --------------------

    function normalizePersian(text) {
        if (!text) return "";
        return text.replace(/[آأإ]/g, 'ا').replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک');
    }

    function toEnglishNumber(persianNumber) {
        if (typeof persianNumber !== 'string') return "";
        if (!persianNumber) return "";
        let englishNumber = "";
        const persianToEnglishMap = {
            "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
            "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
             "٬": ',',
             '،': ',',
        };

        for (const digit of persianNumber) {
            englishNumber += persianToEnglishMap[digit] || digit;
        }
        return englishNumber;
    }

    function formatPrice(price) {
        const numberPrice = Number(price);
        if (isNaN(numberPrice)) return price.toString();
        return numberPrice.toLocaleString("en-US");
    }

    function formatDate(date) {
        const year = date.toLocaleDateString("fa-IR-u-nu-latn", { year: "numeric" });
        const month = date.toLocaleDateString("fa-IR-u-nu-latn", { month: "2-digit" });
        const day = date.toLocaleDateString("fa-IR-u-nu-latn", { day: "2-digit" });
        return `${year}/${month}/${day}`;
    }


    async function getProductsFromFirebase() {
        try {
            const response = await fetch(`${FIREBASE_URL}/products.json`);
            if (!response.ok) {
                console.error("Firebase Error fetching products:", response);
                alert("خطا در دریافت محصولات از Firebase. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Firebase Error fetching products:. See console for details.
                return {};
            }
            const data = await response.json();
            return data || {};
        } catch (error) {
            console.error("Error fetching products from Firebase:", error);
            alert("دریافت محصولات با مشکل مواجه شد. کنسول را بررسی کنید."); // Failed to fetch products. Check console.
            return {};
        }
    }


    async function saveProductToFirebase(productName, productPrice) {
        try {
            const date = new Date();
            const formattedDate = formatDate(date);
            const productData = {
                name: productName,
                price: productPrice,
                date: formattedDate,
            };

            const response = await fetch(`${FIREBASE_URL}/products.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error saving product:", error);
                alert(`خطا در ذخیره محصول: ${error.message || 'خطای ناشناخته'}`); // Error saving product: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'ذخیره محصول با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to save product'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error saving product to Firebase:", error);
            alert(`ذخیره محصول با مشکل مواجه شد: ${error.message}`); // Failed to save product: ${error.message}
            return false; // Failure
        }
    }


    async function deleteProductFromFirebase(productId) {
        try {
            const response = await fetch(`${FIREBASE_URL}/products/${productId}.json`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error deleting product:", error);
                alert(`خطا در حذف محصول: ${error.message || 'خطای ناشناخته'}`); // Error deleting product: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'حذف محصول با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to delete product'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error deleting product from Firebase:", error);
            alert(`حذف محصول با مشکل مواجه شد: ${error.message}`); // Failed to delete product: ${error.message}
            return false; // Failure
        }
    }


    async function updateProductInFirebase(productId, productName, productPrice) {
        try {
            const patchUrl = `${FIREBASE_URL}/products/${productId}.json`;
            const response = await fetch(patchUrl, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: productName,
                    price: productPrice,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error updating product:", error);
                alert(`خطا در بروزرسانی محصول: ${error.message || 'خطای ناشناخته'}`); // Error updating product: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'بروزرسانی محصول با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to update product'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error updating product in Firebase:", error);
            alert(`بروزرسانی محصول با مشکل مواجه شد: ${error.message}`); // Failed to update product: ${error.message}
            return false; // Failure
        }
    }


    async function getBackupsFromFirebase() {
        try {
            const response = await fetch(`${FIREBASE_URL}/backups.json`);
            if (!response.ok) {
                console.error("Firebase Error fetching backups:", response);
                alert("خطا در دریافت پشتیبان ها از Firebase. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Error fetching backups from Firebase. See console for details.
                return {};
            }
            const data = await response.json();
            return data || {};
        } catch (error) {
            console.error("Error fetching backups from Firebase:", error);
            alert("دریافت پشتیبان ها با مشکل مواجه شد. کنسول را بررسی کنید."); // Failed to fetch backups. Check console.
            return {};
        }
    }


    async function saveBackupToFirebase(backupName, products) {
        try {
            const backupData = {
                products: products,
                date: formatDate(new Date()),
            };

            const response = await fetch(`${FIREBASE_URL}/backups/${backupName}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(backupData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error saving backup:", error);
                alert(`خطا در ذخیره پشتیبان: ${error.message || 'خطای ناشناخته'}`); // Error saving backup: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'ذخیره پشتیبان با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to save backup'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error saving backup to Firebase:", error);
            alert(`ذخیره پشتیبان با مشکل مواجه شد: ${error.message}`); // Failed to save backup: ${error.message}
            return false; // Failure
        }
    }


    async function deleteBackupFromFirebase(backupName) {
        try {
            const response = await fetch(`${FIREBASE_URL}/backups/${backupName}.json`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error deleting backup:", error);
                alert(`خطا در حذف پشتیبان: ${error.message || 'خطای ناشناخته'}`); // Error deleting backup: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'حذف پشتیبان با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to delete backup'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error deleting backup from Firebase:", error);
            alert(`حذف پشتیبان با مشکل مواجه شد: ${error.message}`); // Failed to delete backup: ${error.message}
            return false; // Failure
        }
    }

    async function restoreBackupFromFirebase(backupName) {
        try {
            const response = await fetch(`${FIREBASE_URL}/backups/${backupName}/products.json`, {
                method: "GET", // Correct method is GET to retrieve data
                signal: AbortSignal.timeout(3000), // Timeout of 3 seconds
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Firebase Error fetching backup for restore:", error);
                alert(`خطا در دریافت پشتیبان برای بازیابی: ${error.message || 'خطای ناشناخته'}`); // Error fetching backup for restore: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'دریافت پشتیبان برای بازیابی با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to fetch backup for restore'}
            }
            const backupProducts = await response.json();


            const productsResponse = await fetch(`${FIREBASE_URL}/products.json`, {
                method: 'PUT', // Use PUT to replace all existing products with backup
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(backupProducts),
                signal: AbortSignal.timeout(5000), // Timeout for restore operation
            });

            if (!productsResponse.ok) {
                const error = await productsResponse.json();
                console.error("Firebase Error restoring backup:", error);
                alert(`خطا در بازیابی پشتیبان: ${error.message || 'خطای ناشناخته'}`); // Error restoring backup: ${error.message || 'Unknown error'}
                throw new Error(`Firebase error: ${error.message || 'بازیابی پشتیبان با مشکل مواجه شد'}`); // Firebase error: ${error.message || 'Failed to restore backup'}
            }
            return true; // Success
        } catch (error) {
            console.error("Error restoring backup from Firebase:", error);
            alert(`بازیابی پشتیبان با مشکل مواجه شد: ${error.message}`); // Failed to restore backup: ${error.message}
            return false; // Failure
        }
    }


    function fuzzySearch(products, query) {
        const results = {};
        const normalizedQuery = normalizePersian(query).toLowerCase();

        for (const productId in products) {
            if (products.hasOwnProperty(productId)) {
                const product = products[productId];
                const productNameNormalized = normalizePersian(product.name).toLowerCase();
                const productPriceNormalized = toEnglishNumber(product.price);

                if (productNameNormalized.includes(normalizedQuery) || String(productPriceNormalized).includes(normalizedQuery) || String(product.price).includes(query)) {
                    results[productId] = product;
                }
            }
        }
        return results;
    }


    // -------------------- Cookie Functions --------------------
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict;";
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i <cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    // -------------------- UI Interaction Functions - Customization --------------------
    function applyColorTheme(color) {
        document.body.classList.remove('color-green', 'color-blue', 'color-red', 'color-yellow'); // Remove existing color classes
        if (color) {
            document.body.classList.add('color-' + color); // Add the selected color class
            setCookie('colorTheme', color, 365); // Store color preference in cookie for 365 days
        } else {
            setCookie('colorTheme', '', 365); // Clear color cookie if no color selected (e.g., reset to default)
        }
    }

    function applyFont(fontName) {
        document.body.classList.remove('font-vazirmatn', 'font-shabnam', 'font-byekan', 'font-samim', 'font-vazin', 'font-dana', 'font-iransans', 'font-droidarabicnaskh', 'font-tahoma', 'font-arial'); // Remove existing font classes
        if (fontName) {
            document.body.classList.add('font-' + fontName.toLowerCase().replace(/ /g, '')); // Add the selected font class, class names are lowercase and no spaces
            setCookie('fontFamily', fontName, 365); // Store font preference in cookie for 365 days
        } else {
            setCookie('fontFamily', '', 365); // Clear font cookie if no font selected (e.g., reset to default)
        }
    }


    // -------------------- UI Interaction Functions - Product Management --------------------
    let productToDeleteId = null; // Variable to hold the ID of the product to be deleted
    let editingProductId = null; // Global variable to track product being edited
    let currentProducts = {}; // Store current products to avoid repeated Firebase calls

    async function displayProducts() {
        currentProducts = await getProductsFromFirebase();
        renderProductTable(currentProducts);
    }

    function renderProductTable(products) {
        const productTableBody = document.getElementById('product-table-body');
        productTableBody.innerHTML = ''; // Clear existing table rows

        if (!products || Object.keys(products).length === 0) {
            productTableBody.innerHTML = '<tr><td colspan="4">محصولی موجود نیست.</td></tr>'; // No products available.
            return; // Exit if no products to display
        }

        for (const productId in products) {
            if (products.hasOwnProperty(productId)) {
                const product = products[productId];
                const row = productTableBody.insertRow();
                row.insertCell().textContent = product.name;
                row.insertCell().textContent = formatPrice(product.price) + " تومان";
                row.insertCell().textContent = product.date;

                const actionsCell = row.insertCell();
                // Create a container div for buttons
                const actionsContainer = document.createElement('div');
                actionsContainer.className = 'table-actions';

                const editButton = document.createElement('button');
                editButton.className = 'action-button';
                editButton.textContent = 'ویرایش';
                editButton.onclick = () => editProduct(productId, product.name, product.price);
                actionsContainer.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'action-button';
                deleteButton.textContent = 'حذف';
                deleteButton.onclick = () => {
                    productToDeleteId = productId;
                    showDeleteConfirmPopup();
                };
                actionsContainer.appendChild(deleteButton);
                actionsCell.appendChild(actionsContainer);
            }
        }
    }


    async function addProduct() {
        const productNameInput = document.getElementById('product-name');
        const productPriceInput = document.getElementById('product-price');
        const productName = productNameInput.value.trim();
        const productPrice = productPriceInput.value.trim();

        if (!productName || !productPrice) {
            alert("لطفاً نام و قیمت محصول را وارد کنید."); // Please enter both product name and price.
            return;
        }

        if (await saveProductToFirebase(productName, productPrice.replace(/,/g, ''))) { // Remove commas before saving
            alert("محصول با موفقیت اضافه شد!"); // Product added successfully!
            productNameInput.value = '';
            productPriceInput.value = '';
            displayProducts(); // Refresh product list
        } else {
            alert("افزودن محصول با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to add product. See console for details.
        }
    }


    async function deleteProduct(productId) { // Now only deletes after confirmation
        if (await deleteProductFromFirebase(productId)) {
            alert("محصول با موفقیت حذف شد!"); // Product deleted successfully!
            displayProducts(); // Refresh product list
        } else {
            alert("حذف محصول با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to delete product. See console for details.
        }
    }

    // --- Custom Delete Confirmation Popup Functions ---
    const deleteConfirmPopup = document.getElementById('delete-confirm-popup');

    function showDeleteConfirmPopup() {
        deleteConfirmPopup.classList.add('active');
    }

    function hideDeleteConfirmPopup() {
        deleteConfirmPopup.classList.remove('active');
        deleteConfirmPopup.classList.add('popout'); // Add popout class for animation
        setTimeout(() => { // After animation, remove popout class to reset for next time
            deleteConfirmPopup.classList.remove('popout');
        }, 300); // Duration should match CSS transition
    }

    async function confirmDeleteProduct() {
        hideDeleteConfirmPopup(); // Hide popup first
        if (productToDeleteId) {
            await deleteProduct(productToDeleteId); // Proceed with deletion
            productToDeleteId = null; // Clear product ID after deletion
        }
    }

    function cancelDeleteProduct() {
        hideDeleteConfirmPopup(); // Just hide, no deletion
        productToDeleteId = null; // Clear product ID if cancel
    }


    const editProductPopup = document.getElementById('edit-product-popup');

    async function editProduct(productId, currentName, currentPrice) { // Pass current values
        editingProductId = productId; // Store the ID of the product being edited

        const editProductNameInput = document.getElementById('edit-product-name');
        const editProductPriceInput = document.getElementById('edit-product-price');

        editProductNameInput.value = currentName; // Pre-fill with current name
        editProductPriceInput.value = currentPrice; // Pre-fill with current price
        showEditProductPopup(); // Show edit popup
    }

    function showEditProductPopup() {
        editProductPopup.classList.add('active');
    }

    function hideEditProductPopup() {
        editProductPopup.classList.remove('active');
        editProductPopup.classList.add('popout'); // Add popout class for animation
        setTimeout(() => { // After animation, remove popout class to reset for next time
            editProductPopup.classList.remove('popout');
        }, 300); // Duration should match CSS transition
    }


    async function confirmEditProduct() {
        const editProductNameInput = document.getElementById('edit-product-name');
        const editProductPriceInput = document.getElementById('edit-product-price');
        const productName = editProductNameInput.value.trim();
        const productPrice = editProductPriceInput.value.trim();

        if (!productName || !productPrice) {
            alert("لطفاً نام و قیمت محصول را وارد کنید."); // Please enter both product name and price.
            return;
        }

        hideEditProductPopup(); // Hide popup first

        if (editingProductId) {
            if (await updateProductInFirebase(editingProductId, productName, productPrice.replace(/,/g, ''))) { // Remove commas before saving
                alert("محصول با موفقیت بروزرسانی شد!"); // Product updated successfully!
                displayProducts(); // Refresh product list
            } else {
                alert("بروزرسانی محصول با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to update product. See console for details.
            }
            editingProductId = null; // Clear editing ID
        }
    }

    function cancelEditProductPopup() {
        hideEditProductPopup();
        editingProductId = null; // Clear editing ID
    }


    async function searchProducts() {
        const searchTerm = document.getElementById('search-input').value.trim();


        const allProducts = await getProductsFromFirebase();
        const searchResults = fuzzySearch(allProducts, searchTerm);
        renderProductTable(searchResults);
    }

    function sortTable(sortBy, order) {
        let productsArray = Object.entries(currentProducts).map(([productId, product]) => ({ id: productId, ...product }));

        productsArray.sort((a, b) => {
            let valueA, valueB;

            if (sortBy === 'price') {
                const priceA_str = a.price.replace(' تومان', '').trim()
                const priceB_str = b.price.replace(' تومان', '').trim()

                valueA = Number(toEnglishNumber(priceA_str.replace(/[,٬]/g, ''))); // Normalize and remove commas/separators and "تومان"
                valueB = Number(toEnglishNumber(priceB_str.replace(/[,٬]/g, ''))); // Normalize and remove commas/separators and "تومان"
            } else if (sortBy === 'name') {
                valueA = normalizePersian(a.name);
                valueB = normalizePersian(b.name);
            }

            if (order === 'asc') {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            } else if (order === 'desc') {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
                return 0;
            }
        });

        const sortedProducts = {};
        productsArray.forEach(product => {
            sortedProducts[product.id] = product;
        });
        renderProductTable(sortedProducts);
    }


    async function createBackup() {
        const products = await getProductsFromFirebase();
        const backupName = `backup-${Date.now()}`;
        if (await saveBackupToFirebase(backupName, products)) {
            alert(`پشتیبان "${backupName}" با موفقیت ایجاد شد!`); // Backup "${backupName}" created successfully!
        } else {
            alert("ایجاد پشتیبان با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to create backup. See console for details.
        }
    }

    async function listBackups() {
        const backups = await getBackupsFromFirebase();
        let backupListText = ""; // Initialize as empty string
        let backupNames = Object.keys(backups);
        const backupListDiv = document.getElementById('backup-list'); // Get the backup list div

        if (backupNames.length === 0) {
            backupListDiv.textContent = "پشتیبانی موجود نیست."; // No backups available.
            return;
        } else {
            backupListDiv.textContent = ""; // Clear previous list if any
        }

        backupNames.sort((a, b) => { // Sort backups by name (which includes timestamp) - newest first
            return b.localeCompare(a); // Reverse alphabetical sort for timestamp-based names
        });

        backupListText += "پشتیبان های موجود:\n"; // Available Backups:

        for (const backupName of backupNames) {
            const backup = backups[backupName];
            backupListText += `- ${backupName} (تاریخ: ${backup.date})\n`; // - ${backupName} (Date: ${backup.date})
        }
        backupListDiv.textContent = backupListText; // Set text content of the div
    }


    async function deleteBackupMenu() {
        const backups = await getBackupsFromFirebase();
        let backupNames = Object.keys(backups);

        if (backupNames.length === 0) {
            alert("پشتیبانی برای حذف وجود ندارد."); // No backups to delete.
            return;
        }

        const backupNameToDelete = prompt("نام پشتیبانی که می خواهید حذف کنید را وارد نمایید:"); // Enter the name of the backup to delete:
        if (backupNameToDelete) {
            if (backupNames.includes(backupNameToDelete)) {
                if (confirm(`آیا مطمئن هستید که می خواهید پشتیبان "${backupNameToDelete}" را حذف کنید؟`)) { // Are you sure you want to delete backup "${backupNameToDelete}"?
                    if (await deleteBackupFromFirebase(backupNameToDelete)) {
                        alert(`پشتیبان "${backupNameToDelete}" با موفقیت حذف شد!`); // Backup "${backupNameToDelete}" deleted successfully!
                        listBackups(); // Refresh backup list after deletion
                    } else {
                        alert("حذف پشتیبان با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to delete backup. See console for details.
                    }
                }
            } else {
                alert(`پشتیبان "${backupNameToDelete}" یافت نشد.`); // Backup "${backupNameToDelete}" not found.
            }
        }
    }

    async function restoreBackupMenu() {
        const backups = await getBackupsFromFirebase();
        let backupNames = Object.keys(backups);

        if (backupNames.length === 0) {
            alert("پشتیبانی برای بازیابی وجود ندارد."); // No backups to restore from.
            return;
        }

        const backupNameToRestore = prompt("نام پشتیبانی که می خواهید بازیابی کنید را وارد نمایید:"); // Enter the name of the backup to restore:
        if (backupNameToRestore) {
            if (backupNames.includes(backupNameToRestore)) {
                if (confirm(`آیا مطمئن هستید که می خواهید از پشتیبان "${backupNameToRestore}" بازیابی کنید؟ این کار اطلاعات فعلی محصول شما را بازنویسی خواهد کرد.`)) { // Are you sure you want to restore from backup "${backupNameToRestore}"? This will overwrite your current product data.
                    if (await restoreBackupFromFirebase(backupNameToRestore)) {
                        alert(`پایگاه داده با موفقیت از پشتیبان "${backupNameToRestore}" بازیابی شد!`); // Database restored from backup "${backupNameToRestore}" successfully!
                        displayProducts(); // Refresh product list after restore
                    } else {
                        alert("بازیابی پشتیبان با مشکل مواجه شد. برای جزئیات بیشتر به کنسول مراجعه کنید."); // Failed to restore backup. See console for details.
                    }
                }
            } else {
                alert(`پشتیبان "${backupNameToRestore}" یافت نشد.`); // Backup "${backupNameToRestore}" not found.
            }
        }
    }

    // -------------------- UI Interaction Functions - Chatbot --------------------

    async function generateGeminiContent(userMessage) {
        if (!GEMINI_API_KEY) {
            return "کلید API جیمینی پیکربندی نشده است."; // Gemini API key is not configured.
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const headers = {
            'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
            contents: [{
                parts: [{ text: userMessage }]
            }]
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                console.error(`Gemini API error: ${response.status} ${response.statusText}`);
                try {
                    const errorData = await response.json();
                    console.error("Gemini Error details:", errorData);
                } catch (jsonError) {
                    console.error("Failed to parse Gemini error JSON:", jsonError);
                }
                return "متاسفم، جیمینی با یک خطا مواجه شد. لطفا دوباره تلاش کنید."; // Sorry, Gemini encountered an error. Please try again.
            }

            const data = await response.json();
            if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.warn("Unexpected Gemini API response format:", data);
                return "خطای قالب پاسخ جیمینی. لطفا دوباره تلاش کنید."; // Gemini response format error. Please try again.
            }

        } catch (error) {
            console.error("Error during Gemini API call:", error);
            return "متاسفم! جیمینی مشکلی داشت. لطفا بعدا دوباره تلاش کنید."; // Oops! Gemini had a problem. Please try again later.
        }
    }

    async function generateDeepSeekContent(userMessage) {
        if (!DEEPSEEK_API_KEY) {
            return "کلید API دیپ‌سیک پیکربندی نشده است."; // DeepSeek API key is not configured.
        }

        // **IMPORTANT:** Replace with the actual DeepSeek API endpoint and request format.
        // This is a placeholder based on common API patterns.  Refer to DeepSeek API documentation.
        const deepseekApiEndpoint = "https://api.deepseek.com/v1/chat/completions"; // Placeholder -  **CHECK DEEPSEEK DOCS!**
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}` // Assuming API key auth
        };
        const body = JSON.stringify({
            model: "deepseek-chat", // Placeholder model name - **CHECK DEEPSEEK DOCS!**
            messages: [{ role: "user", content: userMessage }] // Assuming chat-style messages
        });


        try {
            const response = await fetch(deepseekApiEndpoint, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                console.error(`DeepSeek API error: ${response.status} ${response.statusText}`);
                try {
                    const errorData = await response.json();
                    console.error("DeepSeek Error details:", errorData);
                } catch (jsonError) {
                    console.error("Failed to parse DeepSeek error JSON:", jsonError);
                }
                return "متاسفم، دیپ‌سیک با یک خطا مواجه شد. لطفا دوباره تلاش کنید."; // Sorry, DeepSeek encountered an error. Please try again.
            }

            const data = await response.json();
             // **IMPORTANT:**  Adapt the response parsing to the actual DeepSeek API response format.
             // This is a placeholder -  **CHECK DEEPSEEK DOCS!**
            if (data.choices && data.choices[0].message && data.choices[0].message.content) {
                return data.choices[0].message.content;
            } else {
                console.warn("Unexpected DeepSeek API response format:", data);
                return "خطای قالب پاسخ دیپ‌سیک. لطفا دوباره تلاش کنید."; // DeepSeek response format error. Please try again.
            }

        } catch (error) {
            console.error("Error during DeepSeek API call:", error);
            return "متاسفم! دیپ‌سیک مشکلی داشت. لطفا بعدا دوباره تلاش کنید."; // Oops! DeepSeek had a problem. Please try again later.
        }
    }

    async function generateGrokContent(userMessage) {
        if (!GROK_API_KEY) {
            return "کلید API گروک پیکربندی نشده است."; // Grok API key is not configured.
        }

        // **IMPORTANT:** You need to replace the placeholder API endpoint and request format below
        // with the actual API details for Grok AI.
        // Refer to the official Grok AI API documentation for the correct endpoint, headers, and request body.

        const grokApiEndpoint = "https://api.grok.com/v1/chat/completions"; // **PLACEHOLDER - REPLACE WITH ACTUAL GROK API ENDPOINT**
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROK_API_KEY}` // Assuming API key auth - **CHECK GROK DOCS**
            // Add any other required headers as per Grok API documentation
        };
        const body = JSON.stringify({
            model: "grok-model-name", // **PLACEHOLDER - REPLACE WITH ACTUAL GROK MODEL NAME from DOCS**
            messages: [{ role: "user", content: userMessage }] // Assuming chat-style messages - **CHECK GROK DOCS**
            // Add any other required parameters as per Grok API documentation
        });


        try {
            const response = await fetch(grokApiEndpoint, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                console.error(`Grok API error: ${response.status} ${response.statusText}`);
                try {
                    const errorData = await response.json();
                    console.error("Grok Error details:", errorData);
                } catch (jsonError) {
                    console.error("Failed to parse Grok error JSON:", jsonError);
                }
                return "متاسفم، Grok AI با یک خطا مواجه شد. لطفا دوباره تلاش کنید."; // Sorry, Grok AI encountered an error. Please try again.
            }

            const data = await response.json();
             // **IMPORTANT:** Adapt the response parsing to the actual Grok API response format.
             // The example below is a placeholder and might not match the real Grok API response.
             // **REFER TO GROK AI API DOCUMENTATION for the correct response structure.**
            if (data.choices && data.choices[0].message && data.choices[0].message.content) {
                return data.choices[0].message.content;
            } else {
                console.warn("Unexpected Grok API response format:", data);
                return "خطای قالب پاسخ Grok AI. لطفا دوباره تلاش کنید."; // Grok AI response format error. Please try again.
            }

        } catch (error) {
            console.error("Error during Grok API call:", error);
            return "متاسفم! Grok AI مشکلی داشت. لطفا بعدا دوباره تلاش کنید."; // Oops! Grok AI had a problem. Please try again later.
        }
    }


    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    const modelSelect = document.getElementById('model-select'); // Get the model select dropdown
    const chatbotPopup = document.getElementById('chatbot-popup');
    const productManagementPopup = document.getElementById('product-management-popup');
    const customizationPopup = document.getElementById('customization-popup'); // Get customization popup
    const searchInput = document.getElementById('search-input'); // Get the search input field
    const productPriceInput = document.getElementById('product-price');


    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    });

    // ** NEW: Event listener for real-time search on input change **
    searchInput.addEventListener('input', function() {
        searchProducts(); // Call searchProducts on each input change
    });


    async function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;

      appendMessage('user-message', message);
      userInput.value = '';
      loadingIndicator.style.display = 'inline';
      sendButton.disabled = true;

      try {
        const selectedModel = modelSelect.value; // Get the selected model
        const botResponse = await getBotResponse(message, selectedModel); // Pass selectedModel to getBotResponse
        appendMessage('bot-message', botResponse);
      } catch (error) {
        appendMessage('bot-message', "متاسفم، مشکلی پیش آمد. لطفا دوباره تلاش کنید."); // Sorry, something went wrong. Please try again.
        console.error("Error getting bot response:", error);
      } finally {
        loadingIndicator.style.display = 'none';
        sendButton.disabled = false;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }


    function appendMessage(senderClass, messageText) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', senderClass);
      messageDiv.textContent = messageText;
      chatContainer.appendChild(messageDiv);
    }

    async function getBotResponse(message, model) { // Modified to accept model parameter
      try {
        let botTextResponse;
        if (model === 'gemini') {
          botTextResponse = await generateGeminiContent(message); // Call Gemini function
        } else if (model === 'deepseek') {
          botTextResponse = await generateDeepSeekContent(message); // Call DeepSeek function
        } else if (model === 'grok') {
          botTextResponse = await generateGrokContent(message); // Call Grok AI function
        }
         else {
          return "خطا: مدل نامعتبر انتخاب شده است."; // Error: Invalid model selected.
        }
        return botTextResponse;
      } catch (error) {
        console.error("Error in getBotResponse:", error);
        return "دریافت پاسخ از ربات با مشکل مواجه شد."; // Failed to get response from bot.
      }
    }


    // -------------------- Section Visibility Functions --------------------

    function showLandingPage() {
        document.getElementById('landing-page-section').style.display = 'flex';
        chatbotPopup.classList.remove('active');
        productManagementPopup.classList.remove('active');
        customizationPopup.classList.remove('active'); // Hide customization popup
        deleteConfirmPopup.classList.remove('active'); // Hide confirm popup too
        hideEditProductPopup(); // Hide edit popup too
    }

    function showChatbotSection() {
        document.getElementById('landing-page-section').style.display = 'none';
        chatbotPopup.classList.add('active');
        productManagementPopup.classList.remove('active');
        customizationPopup.classList.remove('active'); // Hide customization popup
        deleteConfirmPopup.classList.remove('active'); // Hide confirm popup too
        hideEditProductPopup(); // Hide edit popup too
    }

    function showProductManagementSection() {
        document.getElementById('landing-page-section').style.display = 'none';
        chatbotPopup.classList.remove('active');
        productManagementPopup.classList.add('active');
        customizationPopup.classList.remove('active'); // Hide customization popup
        deleteConfirmPopup.classList.remove('active'); // Hide confirm popup too
        hideEditProductPopup(); // Hide edit popup too
        displayProducts(); // Load product list when showing product management
        listBackups(); // Load backup list when showing backup management
    }

    function showCustomizationSection() {
        document.getElementById('landing-page-section').style.display = 'none';
        chatbotPopup.classList.remove('active');
        productManagementPopup.classList.remove('active');
        customizationPopup.classList.add('active'); // Show customization popup
        deleteConfirmPopup.classList.remove('active'); // Hide confirm popup too
        hideEditProductPopup(); // Hide edit popup too
    }


    // Initial state: Show landing page - **Ensuring initial hide in JS too**
    showLandingPage();

    // --- Initialize Product List on Page Load (if starting directly on product_management page) ---
    // Uncomment this line if you want to directly open product_management section on page load instead of landing page
    // showProductManagementSection();

    // --- Apply Cookie Preferences on Page Load ---
    const savedColorTheme = getCookie('colorTheme');
    if (savedColorTheme) {
        applyColorTheme(savedColorTheme);
    }
    const savedFontFamily = getCookie('fontFamily');
    if (savedFontFamily) {
        applyFont(savedFontFamily);
    }


    function formatPriceInput(input) {
        let value = input.value;
        const englishValue = toEnglishNumber(value); // Convert Persian/Arabic numerals to English

        // Remove non-numeric characters and existing commas
        const numberValue = englishValue.replace(/[^0-9]/g, '');

        if (numberValue) {
            const formattedValue = Number(numberValue).toLocaleString('en-US');
            input.value = formattedValue;
        } else {
            input.value = ''; // Clear if not a number
        }
    }


  </script>
</body>
</html>
