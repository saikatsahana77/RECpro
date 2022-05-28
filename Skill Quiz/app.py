from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_to_file', methods=['POST'])
def save_to_file():
    val = request.form['score_obtained']
    k = ""
    with open('./static/js/points.js', 'r') as f:
        k = f.read()
    k = k.strip()
    k = k[:len(k)-2]+","+str(val)+k[len(k)-2:]
    with open('./static/js/points.js', 'w') as f:
        f.write(k)
    return redirect(url_for('index'))

@app.route('/history')
def history():
    return render_template('history.html')

if __name__ == '__main__':
    app.run(debug=True)