from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3

app = Flask(__name__)

if __name__ == '__main__':
    #  add sample scholarships
    add_sample_scholarships()
    app.run(debug=True)

# Route for the landing page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle scholarship submissions
@app.route('/submit', methods=['GET', 'POST'])
def submit_scholarship():
    if request.method == 'POST':
        # Get scholarship data from the form
        name = request.form.get('name')
        location = request.form.get('location')
        university = request.form.get('university')
        deadline = request.form.get('deadline')
        degrees_and_domains = request.form.get('degrees_and_domains')
        criteria = request.form.get('criteria')
        needed_papers = request.form.get('needed_papers')

        # Insert scholarship data into the database
        conn = sqlite3.connect('scholarships.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO scholarships (name, location, university, deadline, degrees_and_domains, criteria, needed_papers)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, location, university, deadline, degrees_and_domains, criteria, needed_papers))
        conn.commit()
        conn.close()

        return redirect(url_for('index'))  # Redirect to the landing page

    return render_template('submit.html')

# Manually adding sample scholarships to the database
def add_sample_scholarships():
    scholarships = [
        ("Academic Excellence Scholarship", "USA", "University of XYZ", "2023-12-15"),
        ("Global Diversity Scholarship", "International", "Any Accredited University", "2023-10-31"),
        ("STEM Innovation Scholarship", "USA", "State University", "2023-09-30"),
        ("Women in Business Scholarship", "USA", "Business School", "2023-11-15"),
        ("Community Service Scholarship", "International", "Any University", "2023-09-01")
    ]

    conn = sqlite3.connect('scholarships.db')
    cursor = conn.cursor()
    for scholarship in scholarships:
        cursor.execute('''
            INSERT INTO scholarships (name, location, university, deadline)
            VALUES (?, ?, ?, ?)
        ''', scholarship)
    conn.commit()
    conn.close()
