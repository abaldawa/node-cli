# Author: Abhijit Baldawa

# node-cli
I have created a "hackernews" cli utility in node.js such that on the terminal (command line) if the user executes:

```bash
hackernews --posts <limit>  (or hackernews -p <limit>)

The output will be as below:

{
  "title": <String>,
  "uri": <String, URL of the post>,
  "author": <String, name of the author>,
  "points": <Number>,
  "comments": <Number, number of comments>,
  "rank": <Number>
}
...
```
#### The cli utility code is written in latest ES 2017 syntax completely with async/await and latest node.js version (10.12) is used. Also, code is completely documented along with design/pattern decision description and method usage documentation

# Folder structure
Evety organization/dev team will require a range of CLI utility. They might also share some common code (ex. logging, utility etc.). Keeping this in mind I have created below directory structure:

1. cli-utilitys folder will have one folder per cli utility (in this case its just hackernews so just one folder exists) and all of the utility code should end up in that folder. <br/>

2. common folder have modules which are required/shared by many (or all) cli utilities. In this case 'utils' and 'logger' modules.<br/>

3. the "hackernews" folder inside "cli-utilities" folder is futher divided into 
    1. Validation -> This folder contains validation module which is specific for this cli utility
    2. services -> It contains module which is fetching data from hackernews server and thus exposes API's to interact with hacker news server
    3. scrapper -> It contains module which will scrape top "n" posts from hacker news server and will print its metadata on the terminal
    

Thus the "node-cli" is very extinsible and can be extended with more cli utilities by just creating new utility folder inside "cli-utilities" folder, adding utility specific code inside it and adding an entry in package.json "bin" key so that it can be called from the terminal.

# npm modules used
1. "commander"
    1. Although I could have used node's inbuild process.argv to manuplate the params and execute node shell command but "commander" module is very standard and popular node module in that it does give easy to use chainable api for adding options and command description. Also user can easily add the kind of flags the utility should accept via the command line and it by default expose --help flag using which user can easily understand more details about the command the the options it accepts. 
    
    2. All of this could be done without the use of "commander" library but with commander it is very elegant and it also have the possibility to handle lot complex situation like adding flags to custom commands etc.
    3. It is actively maintained and very popular for the above mentioned reasons
    
2. "chalk"
    1. Again, I could have used node's inbuild way to color output with console.log by giving RGB color codes but chalk provides a very extensive api to elegantly add color support to the log (and also auto detect color support) which can then be printed with "console.log" or "process.stdout.write" . It also has animation support and lot more which makes for a cleaner code. Most importantly it is actively maintained
    
# npm modules which are not used but could be useful if the use case demands
1. inquirer -> If we are required to build interactive shell (such as accepting inputs from user at each step) then this is very popular and recommended library
2. logupdate -> 
    1. If we want to replace a console log with new log (instead of creating new line every single time) this is good one although not so much actively maintained but is good
    2. I have used node's inbuild api's i.e. `process.stdout.clearLine();` and `process.stdout.cursorTo(0)` to clear and print new log on the console and so I did not use 'logupdate' module
    
# How to run
```bash
1. Install latest version of node.js
2. If git is not installed then istall git
3. git clone https://github.com/abaldawa/node-cli.git
4. cd node-cli
5. npm i -g
```
Once the installation is complete then go to the terminal and type "hackernews" and you would see help and options
