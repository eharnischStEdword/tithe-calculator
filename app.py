from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/status')
def status():
    return jsonify({
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    }), 200

if __name__ == '__main__':
    app.run(debug=False, port=5001)
