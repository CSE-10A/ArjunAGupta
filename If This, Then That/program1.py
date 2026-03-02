# WAP to check if a single character is a vowel or not.

letter = input("Enter a single character plz mr. jeffery: ") # letter variable
vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"] # list of vowels
isvowel = 0
for i in range(10): # go through list of variables
    if letter == vowels[i]:
        print(letter, "is a vowel")
        isvowel = 1
if isvowel == 0:
    print(letter, "is not a vowel")