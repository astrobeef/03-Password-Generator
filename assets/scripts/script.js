/*
0.  Declare variables : uLength, uCharTypes, mPassword, mSpecChars, mNumChars, mLowChars, mCapChars.

1.  Prompt the user for password length.
        1a) Check if the user put in a valid length.
        1b) If NOT, re-prompt the user.
        1c) If yes, then continue.

2.  Confirm if the user wants special characters.
        2a) Confirm if the user wants numeric characters.
        2b) Confirm if the user wants lowercase characters.
        2c) Confirm if the user wants uppercase characters.
        2d) CHECK if the user selected at least one type of character.
        2e) If NOT, then default to uppercase characters, and alert the user that we have done this.

3.  Create a function which passes in two properties: the length, pLength, of the password, and an array, pCharTypes, containing 4 booleans for each character type.
        3a) Check the type of parameters coming in.  Send error if parameters are the wrong type, else, continue.
        3b) Within the function, declare several variables : iCharTypes_n, iChar_CUR, iRandom.
        3c) Define how many character types we can choose from by reading from the parameter 
        3c) Of our available character types, chose a random character type.
        3d) Run a seperate function to chose a random character from that pool of characters.
        3e) Add that new character to our password.
        3f) Repeat until our password meets the length requirement.
3.5.Create a function called "GetRandomCharacter" which passes in one of our character type arrays (special, numeric, lower, upper)
        3.5a) Check if the character type is valid.  If not, send an error.
        3.5b) Grab a random number within the length of our array.
        3.5c) Using the random number, return the corresponding element within our parameter character type array.
4.  Display the randomly generated password to the user.

*/

//----------VARIABLES----------//
//-----------------------------//

var uLength = 0, mPassword = [], uCharTypes = [];

//Below; Most special characters.  I do not use ASCII because special characters are scattered throughout ASCII.
var mSpecChars = ["\'", "\"", "#", "$", "%", "&", "(", ")", "*", "+", ",", "-", ".", "\\", ":", ";", "<", "=", ">", "?", "@", "[", "]", "{", "}", "|"];

//Below; characters defined by their ASCII value.
var mNumChars = [48, 57];                       //The min/max value of the ASCII values for all numbers.  Gets set by ASCII generation function
var mLowChars = [97, 122];                       //The min/max value of the ASCII values for all lower case.  Gets set by ASCII generation function
var mCapChars = [65, 90];                       //The min/max value of the ASCII values for all upper case.  Gets set by ASCII generation function

var mAllTypes = [];                            //All character sets in an array.  Gets set after ASCII generation.
var mUseTypes = [];                            //ALl character sets which will be used.  Gets set after user input.

//----------FUNCTIONS----------//
//-----------------------------//

//Adds all active character sets to the 'mUseTypes' variable.
function AddActiveCharTypes()
{
        for(var i = 0; i < uCharTypes.length; i++)
        {
                if(uCharTypes[i] === true)
                {
                        mUseTypes[i] = mAllTypes[i];
                }
                else
                {
                        mUseTypes[i] = "";
                }
        }

        console.log(mUseTypes);
}

//returns an array of characters generated from the ASCII character chart, using the parameters for the min and max ASCII value.
function generateASCII(pMinMax) {
        //IF the parameter is an array AND the length of the array is 2, then...
        if (Array.isArray(pMinMax) && pMinMax.length === 2) {
                //Declare an array which we will fill then return.
                var iASCII_Arr = [];

                //From the minimum value to the maximum value, create an array using all ASCII values in that range.
                for (let iNum = pMinMax[0]; iNum <= pMinMax[1]; iNum++) {
                        iASCII_Arr.push(String.fromCharCode(iNum));
                }

                return iASCII_Arr;
        }
        //ELSE the parameter is not valid, so...
        else {
                console.error("Parameter is not valid.  Should be an array with a length of 2");
        }
}

//Check if all types of characters are set to false.  Return a boolean: true if all false, false if not.
function areAllTypesFalse() {
        let allTypesFalse = true;

        for (key in uCharTypes) {
                if (uCharTypes[key] === true) {
                        allTypesFalse = false;
                }
        }

        return allTypesFalse;
}

//Returns a random type and avoids grabbing inactive types by recursion.
function getRandomType() {
        let iRandom_TYPE = Math.round(Math.random() * uCharTypes.length);
        
        if (uCharTypes[iRandom_TYPE]) {
                console.log(iRandom_TYPE);
                return iRandom_TYPE;
        }
        else {
                return getRandomType();
        }
}

function GetRandomCharacter(pType) {
        
        if(mUseTypes[pType])
        {
                let i = Math.round(Math.random() * mUseTypes[pType].length);
                
                console.log(mUseTypes[pType][i]);
                return mUseTypes[pType][i];
                
        }
        else
        {
                console.error("Not working");
                console.log("pType" + pType);
        }

}

//Add chars to the password until the password length reaches uLength.
function GeneratePassword(pLength) {

        //IF pLength is a number AND pCharTypes is an array, then...
        if (typeof pLength === "number") {
                let iTypeCount, iChar_CUR, iRandom_CHAR, iRandom_TYPE;

                //For each character in the password length, do...
                for (let iChar = 0; iChar < pLength; iChar++) {
                        //Below; get a round type based 
                        iRandom_TYPE = getRandomType();

                        iRandom_CHAR = GetRandomCharacter(iRandom_TYPE);

                        mPassword.push(iRandom_CHAR);

                }
                
                mPassword = mPassword.join("");
        }
        else {
                console.error("Wrong types for parameters");
        }
}

//----------MAIN PROCESS----------//
//--------------------------------//

mNumChars = generateASCII(mNumChars);
mLowChars = generateASCII(mLowChars);
mCapChars = generateASCII(mCapChars);

mAllTypes = [mSpecChars, mNumChars, mLowChars, mCapChars];

//Set the variable 'uLength' to the user's input.
uLength = prompt("How long would you like your password to be? (Between 8 and 128 characters)");

//While the variable 'uLength' is NOT a number, AND less than 8, AND less than 128, ...
while (isNaN(uLength) || uLength < 8 || uLength > 128) {
        uLength = prompt("That wasn't a valid answer... try again.");
}

//Convert length into a number.
uLength = parseInt(uLength);

//Will the user use special characters
uCharTypes[0] = confirm("Would you like to use Special Characters ($, #, ^, ...)");

//Will the user use number characters
uCharTypes[1] = confirm("Would you like to use Numeric Characters (1, 2, 3, ...)");

//Will the user use lowercase characters
uCharTypes[2] = confirm("Would you like to use Lowercase Characters (a, b, c, ...)");

//Will the user use uppercase characters
uCharTypes[3] = confirm("Would you like to use Uppercase Characters (A, B, C, ...)");

//Set uppercase to true, if the user set all options to false.
if (areAllTypesFalse()) {
        alert("No character type was set, so we are using only Uppercase characters.");

        uCharTypes[3] = true;
}

//Adds all 'true' options within the character sets.
AddActiveCharTypes();

GeneratePassword(uLength, uCharTypes);

alert(mPassword);