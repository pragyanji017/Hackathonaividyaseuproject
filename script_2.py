# Now let's implement a simple neural network for behavior analysis
# This will analyze student behavior patterns to predict potential security risks

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights randomly
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        
        # Weights and biases
        self.weights1 = [[random.uniform(-1, 1) for _ in range(hidden_size)] for _ in range(input_size)]
        self.bias1 = [random.uniform(-1, 1) for _ in range(hidden_size)]
        
        self.weights2 = [[random.uniform(-1, 1) for _ in range(output_size)] for _ in range(hidden_size)]
        self.bias2 = [random.uniform(-1, 1) for _ in range(output_size)]
        
        self.learning_rate = 0.1
    
    def sigmoid(self, x):
        """Sigmoid activation function"""
        try:
            return 1 / (1 + math.exp(-x))
        except OverflowError:
            return 0 if x < 0 else 1
    
    def sigmoid_derivative(self, x):
        """Derivative of sigmoid function"""
        return x * (1 - x)
    
    def forward(self, inputs):
        """Forward propagation"""
        # Input to hidden layer
        self.hidden_layer = []
        for j in range(self.hidden_size):
            activation = self.bias1[j]
            for i in range(len(inputs)):
                activation += inputs[i] * self.weights1[i][j]
            self.hidden_layer.append(self.sigmoid(activation))
        
        # Hidden to output layer
        self.output_layer = []
        for j in range(self.output_size):
            activation = self.bias2[j]
            for i in range(self.hidden_size):
                activation += self.hidden_layer[i] * self.weights2[i][j]
            self.output_layer.append(self.sigmoid(activation))
        
        return self.output_layer
    
    def train_step(self, inputs, target):
        """Single training step with backpropagation"""
        # Forward pass
        output = self.forward(inputs)
        
        # Calculate output layer errors
        output_errors = []
        for i in range(self.output_size):
            error = target[i] - output[i]
            output_errors.append(error * self.sigmoid_derivative(output[i]))
        
        # Calculate hidden layer errors
        hidden_errors = []
        for i in range(self.hidden_size):
            error = 0
            for j in range(self.output_size):
                error += output_errors[j] * self.weights2[i][j]
            hidden_errors.append(error * self.sigmoid_derivative(self.hidden_layer[i]))
        
        # Update weights and biases (simplified backpropagation)
        # Update hidden to output weights
        for i in range(self.hidden_size):
            for j in range(self.output_size):
                self.weights2[i][j] += self.learning_rate * output_errors[j] * self.hidden_layer[i]
        
        # Update output biases
        for i in range(self.output_size):
            self.bias2[i] += self.learning_rate * output_errors[i]
        
        # Update input to hidden weights
        for i in range(self.input_size):
            for j in range(self.hidden_size):
                self.weights1[i][j] += self.learning_rate * hidden_errors[j] * inputs[i]
        
        # Update hidden biases
        for i in range(self.hidden_size):
            self.bias1[i] += self.learning_rate * hidden_errors[i]

class BehaviorAnalyzer:
    def __init__(self):
        # Neural network: 4 inputs (behavior_score, attendance, grade, time), 1 output (risk_level)
        self.neural_net = SimpleNeuralNetwork(4, 6, 1)
        self.trained = False
    
    def prepare_training_data(self, students):
        """Prepare training data from student records"""
        training_inputs = []
        training_targets = []
        
        for student in students:
            # Normalize inputs
            behavior_score = student['behavior_score']
            attendance_rate = student['attendance_rate']
            grade_normalized = student['grade'] / 12.0  # Normalize grade to 0-1
            time_factor = random.uniform(0, 1)  # Simulated time factor
            
            inputs = [behavior_score, attendance_rate, grade_normalized, time_factor]
            
            # Calculate risk level (lower behavior score and attendance = higher risk)
            risk_level = 1.0 - (behavior_score * attendance_rate)
            target = [risk_level]
            
            training_inputs.append(inputs)
            training_targets.append(target)
        
        return training_inputs, training_targets
    
    def train(self, students, epochs=100):
        """Train the neural network on student behavior data"""
        training_inputs, training_targets = self.prepare_training_data(students)
        
        print(f"Training neural network for {epochs} epochs...")
        
        for epoch in range(epochs):
            total_loss = 0
            for inputs, target in zip(training_inputs, training_targets):
                output = self.neural_net.forward(inputs)
                loss = (target[0] - output[0]) ** 2
                total_loss += loss
                
                self.neural_net.train_step(inputs, target)
            
            if epoch % 20 == 0:
                avg_loss = total_loss / len(training_inputs)
                print(f"Epoch {epoch}: Average Loss = {avg_loss:.4f}")
        
        self.trained = True
        print("Neural network training completed!")
    
    def analyze_behavior(self, student_data):
        """Analyze student behavior and return risk assessment"""
        if not self.trained:
            return "Neural network not trained", 0.5
        
        # Prepare input
        behavior_score = student_data.get('behavior_score', 0.8)
        attendance_rate = student_data.get('attendance_rate', 0.9)
        grade_normalized = student_data.get('grade', 10) / 12.0
        time_factor = 0.5  # Default time factor
        
        inputs = [behavior_score, attendance_rate, grade_normalized, time_factor]
        
        # Get prediction
        risk_output = self.neural_net.forward(inputs)[0]
        
        # Classify risk level
        if risk_output < 0.3:
            risk_category = "LOW RISK"
        elif risk_output < 0.6:
            risk_category = "MEDIUM RISK"
        else:
            risk_category = "HIGH RISK"
        
        return risk_category, risk_output

# Initialize and train behavior analyzer
behavior_analyzer = BehaviorAnalyzer()
behavior_analyzer.train(security_data.student_database, epochs=50)

# Test behavior analysis
test_student = {
    'name': 'Test Student',
    'behavior_score': 0.6,  # Lower behavior score
    'attendance_rate': 0.75,  # Lower attendance
    'grade': 10
}

risk_category, risk_score = behavior_analyzer.analyze_behavior(test_student)
print(f"\nBehavior Analysis Results:")
print(f"Student: {test_student['name']}")
print(f"Risk Category: {risk_category}")
print(f"Risk Score: {risk_score:.3f}")