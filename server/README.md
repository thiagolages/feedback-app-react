# SOLID

1. Single Responsibility Principle
2. Open/Closed Principle
3. Liskov Substituition Principle
4. Interface Segregation Principle
5. Dependency Inversion Principle
   
   ------

1. Each class has a UNIQUE responsibility; 
2. Our application classes should be open for extension, but closed for modifications;
3. We should be able to replace a parent class for its children, and everything should keep working as usual;
4. Separate interfaces as much as we can. Instead of having a class implementing a single parent class with all interfaces, we should have a class implementing multiple separate interfaces
5. Instead of having a class(function) request dependencies, we should pass these dependencies to the class(function), and it should only use it. The class(function) doen't even know that it 'depends' on something, it just uses these dependencies/services