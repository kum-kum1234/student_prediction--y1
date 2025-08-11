import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import json

# Set random seed for reproducibility
np.random.seed(42)

# Generate synthetic student data
def generate_student_data(n_samples=1000):
    data = []
    
    for i in range(n_samples):
        # Basic demographics
        age = np.random.randint(18, 25)
        gender = np.random.choice(['Male', 'Female'])
        
        # Academic factors
        high_school_gpa = np.random.normal(3.2, 0.6)
        high_school_gpa = np.clip(high_school_gpa, 2.0, 4.0)
        
        study_hours_per_week = np.random.gamma(2, 5)
        study_hours_per_week = np.clip(study_hours_per_week, 1, 40)
        
        attendance_rate = np.random.beta(8, 2) * 100
        
        # Course performance
        math_grade = np.random.normal(75, 15)
        math_grade = np.clip(math_grade, 40, 100)
        
        english_grade = np.random.normal(78, 12)
        english_grade = np.clip(english_grade, 45, 100)
        
        science_grade = np.random.normal(73, 14)
        science_grade = np.clip(science_grade, 40, 100)
        
        # Socioeconomic factors
        family_income = np.random.choice(['Low', 'Medium', 'High'], p=[0.3, 0.5, 0.2])
        parent_education = np.random.choice(['High School', 'Bachelor', 'Graduate'], p=[0.4, 0.4, 0.2])
        
        # Behavioral factors
        extracurricular_activities = np.random.randint(0, 5)
        part_time_job = np.random.choice([0, 1], p=[0.6, 0.4])
        
        # Mental health and support
        stress_level = np.random.randint(1, 11)  # 1-10 scale
        social_support = np.random.randint(1, 11)  # 1-10 scale
        
        # Technology access
        has_computer = np.random.choice([0, 1], p=[0.1, 0.9])
        internet_quality = np.random.choice(['Poor', 'Good', 'Excellent'], p=[0.2, 0.5, 0.3])
        
        # Calculate success probability based on factors
        success_prob = (
            (high_school_gpa - 2.0) / 2.0 * 0.25 +
            min(study_hours_per_week / 20, 1) * 0.20 +
            attendance_rate / 100 * 0.15 +
            ((math_grade + english_grade + science_grade) / 3 - 50) / 50 * 0.20 +
            (extracurricular_activities / 4) * 0.05 +
            (social_support / 10) * 0.05 +
            (1 - stress_level / 10) * 0.05 +
            has_computer * 0.05
        )
        
        # Add some randomness
        success_prob += np.random.normal(0, 0.1)
        success_prob = np.clip(success_prob, 0, 1)
        
        # Determine success (1) or failure (0)
        success = 1 if success_prob > 0.6 else 0
        
        data.append({
            'age': age,
            'gender': 1 if gender == 'Male' else 0,
            'high_school_gpa': round(high_school_gpa, 2),
            'study_hours_per_week': round(study_hours_per_week, 1),
            'attendance_rate': round(attendance_rate, 1),
            'math_grade': round(math_grade, 1),
            'english_grade': round(english_grade, 1),
            'science_grade': round(science_grade, 1),
            'family_income': 0 if family_income == 'Low' else (1 if family_income == 'Medium' else 2),
            'parent_education': 0 if parent_education == 'High School' else (1 if parent_education == 'Bachelor' else 2),
            'extracurricular_activities': extracurricular_activities,
            'part_time_job': part_time_job,
            'stress_level': stress_level,
            'social_support': social_support,
            'has_computer': has_computer,
            'internet_quality': 0 if internet_quality == 'Poor' else (1 if internet_quality == 'Good' else 2),
            'success': success
        })
    
    return pd.DataFrame(data)

# Generate the dataset
print("Generating student dataset...")
df = generate_student_data(1000)

# Display basic statistics
print(f"Dataset shape: {df.shape}")
print(f"Success rate: {df['success'].mean():.2%}")
print("\nDataset info:")
print(df.describe())

# Prepare features and target
X = df.drop('success', axis=1)
y = df['success']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"\nTraining set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")

# Train multiple classification models
models = {
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Logistic Regression': LogisticRegression(random_state=42),
    'SVM': SVC(probability=True, random_state=42)
}

model_results = {}

print("\nTraining models...")
for name, model in models.items():
    print(f"\nTraining {name}...")
    
    # Use scaled data for Logistic Regression and SVM, original for Random Forest
    if name in ['Logistic Regression', 'SVM']:
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"{name} Accuracy: {accuracy:.4f}")
    print(f"Classification Report for {name}:")
    print(classification_report(y_test, y_pred))
    
    model_results[name] = {
        'accuracy': accuracy,
        'predictions': y_pred.tolist(),
        'probabilities': y_pred_proba.tolist()
    }

# Save the best model (Random Forest typically performs well)
best_model = models['Random Forest']
joblib.dump(best_model, 'student_success_model.pkl')
joblib.dump(scaler, 'feature_scaler.pkl')

# Save feature names for later use
feature_names = X.columns.tolist()
with open('feature_names.json', 'w') as f:
    json.dump(feature_names, f)

# Save model results
with open('model_results.json', 'w') as f:
    json.dump(model_results, f)

# Save sample data for the web interface
sample_data = df.head(10).to_dict('records')
with open('sample_data.json', 'w') as f:
    json.dump(sample_data, f)

print("\nModel training completed!")
print("Files saved:")
print("- student_success_model.pkl")
print("- feature_scaler.pkl") 
print("- feature_names.json")
print("- model_results.json")
print("- sample_data.json")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': best_model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nTop 10 Most Important Features:")
print(feature_importance.head(10))
