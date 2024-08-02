# INVISIBLE-VISIONARY
Accessible E-Commerce Platform for Visually Challenged People

Overview

This project presents “Invisible Visionary,” an innovative e-commerce platform designed to enhance accessibility for visually challenged users. The platform integrates AI-powered voice assistance and face recognition technology to facilitate seamless interaction, secure authentication, and a more inclusive shopping experience.

Features

AI-Powered Voice Assistance (Alan AI)

	•	Natural Language Processing (NLP) and Spoken Language Understanding (SLU) for intuitive user interactions.
	•	Automatic Speech Recognition (ASR) and Text-to-Speech (TTS) for seamless voice-based navigation.
	•	Voice commands for product search, category browsing, cart management, and order tracking.
	•	Biometric Authentication via face recognition for secure transactions.

Face Recognition (OpenCV & SVM)

	•	Login and Registration: Authenticate users using face recognition.
	•	Secure Checkout: Ensures secure transactions through biometric authentication.
	•	SVM Algorithm: Utilized for accurate and efficient face recognition.

User Roles and Management

	•	Admin: Manage agents and oversee system operations.
	•	Agent: Handle product management, sales monitoring, and customer feedback.
	•	User: Access the platform with features like product browsing, order management, and secure checkout, all through voice commands.

Modules

Admin

	•	Login: Secure access to admin panel.
	•	Agent Management: Add, update, or remove agents.

Agent

	•	Product Management: Create, read, update, and delete products.
	•	Sales Monitoring: Filter sales data by different timeframes.
	•	Review Assessment: View and assess customer feedback.

User

	•	Voice-Based Navigation: Use voice commands for product search, filtering, and more.
	•	Wishlist Creation: Save desired products for later.
	•	Order Management: Track, return, and review orders.
	•	Secure Transactions: Face recognition for biometric authentication during checkout.

Technology Stack

	•	Frontend: MERN Stack (MongoDB, Express, React, Node.js)
	•	Backend: Python and Flask
	•	AI Integration: Alan AI for voice assistance
	•	Face Recognition: OpenCV and SVM Algorithm

Research Paper

This project is based on the research paper titled Invisible Visionary, published in SSRN Elsevier. The paper details the integration of face recognition technology and voice AI to enhance the accessibility of e-commerce platforms for visually challenged users. SSRN Elsevier Publication Link: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4910534 

Installation

	1.	Clone the repository: git clone https://github.com/sivakumarsnandhini/INVISIBLE-VISIONARY.git
	2.	Install dependencies:
	•	For the frontend: cd frontend && npm install
	•	For the backend: cd backend && npm install
	3.	Run the frontend: npm start
	4.	Run the backend and face_recogn: node server.js, python3 main.py

Usage

	•	Admin: Access the admin panel to manage agents and monitor platform activity.
	•	Agents: Log in to manage products and view sales data.
	•	Users: Register or log in using face recognition, and navigate the platform using voice commands.

Contribution

Contributions are welcome! Please feel free to submit a pull request or report any issues.

License

This project is licensed under the MIT License.

Contact

For more information, please contact sapless.06birch@icloud.com
