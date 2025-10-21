from flask import Flask, render_template, jsonify
from datetime import datetime
import os
import logging

app = Flask(__name__)

# Configure logging for Render
if not app.debug:
    logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)

@app.route('/')
def index():
    try:
        app.logger.info("Serving index page")
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f"Error serving index: {str(e)}")
        return jsonify({"error": "Failed to load page"}), 500

@app.route('/health')
def health():
    try:
        return jsonify({"status": "healthy"}), 200
    except Exception as e:
        app.logger.error(f"Health check failed: {str(e)}")
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

@app.route('/status')
def status():
    try:
        return jsonify({
            "status": "running",
            "timestamp": datetime.utcnow().isoformat(),
            "port": os.environ.get('PORT', 5001)
        }), 200
    except Exception as e:
        app.logger.error(f"Status check failed: {str(e)}")
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=False, host='0.0.0.0', port=port)
