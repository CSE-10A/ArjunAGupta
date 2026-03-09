import random  # needed for program 10 (random number guessing game)

# show the menu so user knows what's available
print("pick a program to run (1-10)")
print("1. vowel check")
print("2. even or odd")
print("3. day from number")
print("4. voting eligibility")
print("5. equilateral triangle check")
print("6. larger of two numbers")
print("7. celsius/fahrenheit converter")
print("8. weird or not weird")
print("9. leap year check")
print("10. guess a number")

choice = int(input("\nenter choice: "))

# ---- program 1 - vowel or not ----
# we just check if the character (lowercased) is in the vowel string
if choice == 1:
    ch = input("enter a character: ")
    if ch.lower() in "aeiou":  # lowercase so A and a both work
        print(ch, "is a vowel")
    else:
        print(ch, "is not a vowel")

# ---- program 2 - even or odd ----
# if remainder when divided by 2 is 0, its even, otherwise odd
elif choice == 2:
    n = int(input("enter a number: "))
    if n % 2 == 0:  # % is the modulus operator - gives the remainder
        print(n, "is even")
    else:
        print(n, "is odd")

# ---- program 3 - day from number ----
# dictionary maps numbers 1-7 to day names, easier than a bunch of if/elif
elif choice == 3:
    days = {1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 7:"Sunday"}
    n = int(input("enter a number (1-7): "))
    if n in days:  # check the key exists before accessing it
        print("day is:", days[n])
    else:
        print("invalid number, enter between 1 and 7")

# ---- program 4 - voting eligibility ----
# voting age is 18, simple check
elif choice == 4:
    age = int(input("enter your age: "))
    if age >= 18:
        print("you are eligible to vote")
    else:
        print("you are not eligible to vote")

# ---- program 5 - equilateral triangle ----
# equilateral means all 3 sides are equal
elif choice == 5:
    a = int(input("enter side 1: "))
    b = int(input("enter side 2: "))
    c = int(input("enter side 3: "))
    if a == b == c:  # python lets you chain comparisons like this
        print("it is an equilateral triangle")
    else:
        print("not an equilateral triangle")

# ---- program 6 - larger of two numbers ----
# also handles the case where they're equal
elif choice == 6:
    a = float(input("enter first number: "))  # float so decimals work too
    b = float(input("enter second number: "))
    if a > b:
        print("larger number is:", a)
    elif b > a:
        print("larger number is:", b)
    else:
        print("both numbers are equal")

# ---- program 7 - temperature converter ----
# formula: f = (c * 9/5) + 32  or rearranged: c = (f - 32) * 5/9
elif choice == 7:
    print("convert: 1) celsius to fahrenheit  2) fahrenheit to celsius")
    opt = int(input("choice: "))
    if opt == 1:
        c = float(input("enter celsius: "))
        f = (c * 9/5) + 32  # standard C to F formula
        print(f"{c}°C is {f} in Fahrenheit")
    else:
        f = float(input("enter fahrenheit: "))
        c = (f - 32) * 5/9  # rearranged formula for F to C
        print(f"{f}°F is {round(c)} in Celsius")  # round to avoid long decimals

# ---- program 8 - weird or not weird ----
# odd is always weird, even depends on the range it falls in
elif choice == 8:
    n = int(input("enter a number: "))
    if n % 2 != 0:          # odd number
        print("Weird")
    elif 2 <= n <= 5:       # even, small range
        print("Not Weird")
    elif 6 <= n <= 20:      # even, mid range
        print("Weird")
    elif n > 20:            # even, large
        print("Not Weird")

# ---- program 9 - leap year ----
# order matters here - check 400 first, then 100, then 4
# if you check 4 first you'd get wrong answers for century years like 1900
elif choice == 9:
    year = int(input("enter a year: "))
    if year % 400 == 0:     # divisible by 400 = always a leap year
        result = True
    elif year % 100 == 0:   # divisible by 100 but not 400 = not a leap year
        result = False
    elif year % 4 == 0:     # divisible by 4 but not 100 = leap year
        result = True
    else:                   # not divisible by 4 at all = not a leap year
        result = False
    print(result)

# ---- program 10 - guess the number ----
# randomly picks a number 1-9, keeps asking until user gets it right
elif choice == 10:
    secret = random.randint(1, 9)  # pick a random number, user doesn't see this
    while True:  # loop forever until we break out on a correct guess
        guess = int(input("guess a number between 1 and 9: "))
        if guess == secret:
            print("Well guessed!")
            break  # correct guess, exit the loop
        else:
            print("wrong, try again")  # wrong guess, loop runs again

else:
    print("invalid choice")  # user entered something outside 1-10