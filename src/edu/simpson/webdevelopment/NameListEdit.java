package edu.simpson.webdevelopment;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Console;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    private Pattern nameValidationPattern;
    private Pattern phoneValidationPattern;
    private Pattern emailValidationPattern;
    private Pattern birthdayValidationPattern;

    public NameListEdit(){
        nameValidationPattern = Pattern.compile("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,30}$");
        phoneValidationPattern = Pattern.compile("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$");
        emailValidationPattern = Pattern.compile("^\\S+@\\S+\\.\\S+$");
        birthdayValidationPattern = Pattern.compile("^[0-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        // Just confirm we are calling the servlet we think we are
        out.println("JSON Post");

        // Open the request for reading. Read in each line, put it into a string.
        // Yes, I think there should be an easier way.
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        // Output the string we got as a request, just as a check
        out.println(requestString);

        // Great! Now we want to use GSON to parse the object, and pop it into our business object. Field
        // names have to match. That's the magic.
        Gson gson = new Gson();
        Person fromJson = gson.fromJson(requestString, Person.class);

        //Validate and insert
        Matcher m1 = nameValidationPattern.matcher(fromJson.getFirst());
        Matcher m2 = nameValidationPattern.matcher(fromJson.getLast());
        Matcher m3 = phoneValidationPattern.matcher(fromJson.getPhone());
        Matcher m4 = emailValidationPattern.matcher(fromJson.getEmail());
        Matcher m5 = birthdayValidationPattern.matcher(fromJson.getBirthday());

        boolean allValid = true;

        if(m1.find()){
            System.out.println("First Name is Valid");
        } else {
            System.out.println("First Name is not Valid");
            allValid = false;
        }

        if(m2.find()){
            System.out.println("Last Name is Valid");
        } else {
            System.out.println("Last Name is not Valid");
            allValid = false;
        }

        if(m3.find()){
            System.out.println("Phone is Valid");
        } else {
            System.out.println("Phone is not Valid");
            allValid = false;
        }

        if(m4.find()){
            System.out.println("Email is Valid");
        } else {
            System.out.println("Email is not Valid");
            allValid = false;
        }

        if(m5.find()){
            System.out.println("Birthday is Valid");
        } else {
            System.out.println("Birthday is not Valid");
            allValid = false;
        }

        if(allValid){
            if(fromJson.getId() == null){
                PersonDAO.insertPerson(fromJson);
            } else {
                PersonDAO.updatePerson(fromJson);
            }
            System.out.println("All fields passed validation");
        } else {
            System.out.println("All fields did not pass validation");
        }

    }
}
