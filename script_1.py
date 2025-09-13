# Now let's implement the KNN algorithm for security threat classification
# This will be used to classify new incidents based on historical data

class KNNSecurityClassifier:
    def __init__(self, k=5):
        self.k = k
        self.training_data = []
        self.labels = []
    
    def train(self, incidents):
        """Train the KNN classifier with historical incident data"""
        for incident in incidents:
            # Feature extraction: convert incident to numerical features
            features = self.extract_features(incident)
            label = incident['threat_level']
            
            self.training_data.append(features)
            self.labels.append(label)
        
        print(f"KNN Classifier trained with {len(self.training_data)} incidents")
    
    def extract_features(self, incident):
        """Extract numerical features from incident data"""
        # Location encoding
        location_map = {"Main Gate": 0, "Cafeteria": 1, "Library": 2, "Playground": 3, "Classroom A-101": 4}
        location_feature = location_map.get(incident['location'], 0)
        
        # Incident type encoding
        type_map = {"Unauthorized Access": 0, "Suspicious Behavior": 1, "Emergency": 2, "Violation": 3}
        type_feature = type_map.get(incident['type'], 0)
        
        # Time feature (hour of day)
        time_feature = incident['timestamp'].hour
        
        # Response time feature
        response_time = incident.get('response_time', 15)
        
        return [location_feature, type_feature, time_feature, response_time]
    
    def euclidean_distance(self, point1, point2):
        """Calculate Euclidean distance between two points"""
        distance = 0
        for i in range(len(point1)):
            distance += (point1[i] - point2[i]) ** 2
        return math.sqrt(distance)
    
    def predict(self, new_incident):
        """Predict threat level for new incident using KNN"""
        if not self.training_data:
            return "MEDIUM"  # Default prediction
        
        # Extract features from new incident
        new_features = self.extract_features(new_incident)
        
        # Calculate distances to all training points
        distances = []
        for i, training_point in enumerate(self.training_data):
            distance = self.euclidean_distance(new_features, training_point)
            distances.append((distance, self.labels[i]))
        
        # Sort by distance and get k nearest neighbors
        distances.sort(key=lambda x: x[0])
        k_nearest = distances[:self.k]
        
        # Vote for the most common label
        label_votes = {}
        for _, label in k_nearest:
            label_votes[label] = label_votes.get(label, 0) + 1
        
        # Return the label with most votes
        predicted_label = max(label_votes, key=label_votes.get)
        confidence = label_votes[predicted_label] / self.k
        
        return predicted_label, confidence

# Initialize and train KNN classifier
knn_classifier = KNNSecurityClassifier(k=3)
knn_classifier.train(security_data.security_incidents)

# Test the classifier with a new incident
test_incident = {
    'type': 'Unauthorized Access',
    'timestamp': datetime.datetime.now(),
    'location': 'Main Gate',
    'response_time': 5
}

prediction, confidence = knn_classifier.predict(test_incident)
print(f"\nKNN Prediction for new incident:")
print(f"Incident: {test_incident['type']} at {test_incident['location']}")
print(f"Predicted Threat Level: {prediction}")
print(f"Confidence: {confidence:.2f}")