# Now let's implement binary search for quick student/staff lookup
# This is crucial for real-time security checks

class SecurityDatabase:
    def __init__(self):
        self.students = []
        self.staff = []
        self.visitors = []
        self.sorted_by_id = True
        
    def add_person(self, person_type, person_data):
        """Add person to appropriate database"""
        if person_type == "student":
            self.students.append(person_data)
            self.students.sort(key=lambda x: x['id'])
        elif person_type == "staff":
            self.staff.append(person_data)
            self.staff.sort(key=lambda x: x['id'])
        elif person_type == "visitor":
            self.visitors.append(person_data)
    
    def binary_search_by_id(self, database, target_id):
        """Binary search implementation to find person by ID"""
        left, right = 0, len(database) - 1
        comparisons = 0
        
        while left <= right:
            comparisons += 1
            mid = (left + right) // 2
            
            if database[mid]['id'] == target_id:
                return database[mid], comparisons
            elif database[mid]['id'] < target_id:
                left = mid + 1
            else:
                right = mid - 1
        
        return None, comparisons
    
    def linear_search_by_id(self, database, target_id):
        """Linear search for comparison"""
        comparisons = 0
        for person in database:
            comparisons += 1
            if person['id'] == target_id:
                return person, comparisons
        return None, comparisons
    
    def quick_lookup(self, person_id):
        """Quick lookup using binary search across all databases"""
        # Search students first (most common)
        result, comparisons = self.binary_search_by_id(self.students, person_id)
        if result:
            return result, "student", comparisons
        
        # Search staff
        result, staff_comparisons = self.binary_search_by_id(self.staff, person_id)
        if result:
            return result, "staff", comparisons + staff_comparisons
        
        # Linear search visitors (usually smaller, unsorted)
        for visitor in self.visitors:
            if visitor['id'] == person_id:
                return visitor, "visitor", comparisons + staff_comparisons + 1
        
        return None, "unknown", comparisons + staff_comparisons + len(self.visitors)
    
    def get_security_status(self, person_id):
        """Get comprehensive security status for a person"""
        person, person_type, search_comparisons = self.quick_lookup(person_id)
        
        if not person:
            return {
                'found': False,
                'access_granted': False,
                'reason': 'Person not found in database',
                'search_comparisons': search_comparisons
            }
        
        # Check authorization
        authorized = person.get('authorized', False)
        current_time = datetime.datetime.now()
        
        # Additional security checks
        if person_type == "visitor":
            # Check if visitor pass is still valid
            pass_expiry = person.get('pass_expiry', current_time - datetime.timedelta(days=1))
            if current_time > pass_expiry:
                authorized = False
        
        return {
            'found': True,
            'person': person,
            'person_type': person_type,
            'access_granted': authorized,
            'last_entry': person.get('last_entry'),
            'search_comparisons': search_comparisons,
            'timestamp': current_time
        }

# Initialize security database and populate with data
sec_db = SecurityDatabase()

# Add students from our existing data
for student in security_data.student_database:
    sec_db.add_person("student", student)

# Add some staff members
staff_members = [
    {'id': 'STF001', 'name': 'Dr. Rajesh Sharma', 'department': 'Mathematics', 'authorized': True},
    {'id': 'STF002', 'name': 'Ms. Priya Gupta', 'department': 'Science', 'authorized': True},
    {'id': 'STF003', 'name': 'Mr. Amit Singh', 'department': 'Security', 'authorized': True}
]

for staff in staff_members:
    sec_db.add_person("staff", staff)

# Add some visitors
visitors = [
    {'id': 'VIS001', 'name': 'Parent Meeting', 'authorized': True, 'pass_expiry': datetime.datetime.now() + datetime.timedelta(hours=2)},
    {'id': 'VIS002', 'name': 'Delivery Person', 'authorized': False, 'pass_expiry': datetime.datetime.now() - datetime.timedelta(hours=1)}
]

for visitor in visitors:
    sec_db.add_person("visitor", visitor)

print("Security Database initialized with:")
print(f"- {len(sec_db.students)} students")
print(f"- {len(sec_db.staff)} staff members")
print(f"- {len(sec_db.visitors)} visitors")

# Test binary search vs linear search performance
test_id = "STD1005"
print(f"\nTesting search performance for ID: {test_id}")

# Binary search
result_binary, comp_binary = sec_db.binary_search_by_id(sec_db.students, test_id)
print(f"Binary search: {comp_binary} comparisons")

# Linear search
result_linear, comp_linear = sec_db.linear_search_by_id(sec_db.students, test_id)
print(f"Linear search: {comp_linear} comparisons")

# Test comprehensive security lookup
security_status = sec_db.get_security_status("STD1002")
print(f"\nSecurity Status Check:")
print(f"Person found: {security_status['found']}")
if security_status['found']:
    print(f"Name: {security_status['person']['name']}")
    print(f"Type: {security_status['person_type']}")
    print(f"Access granted: {security_status['access_granted']}")
    print(f"Search efficiency: {security_status['search_comparisons']} comparisons")