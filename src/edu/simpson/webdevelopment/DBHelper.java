package edu.simpson.webdevelopment;

import javax.naming.Context;
import java.sql.Connection;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DBHelper {
    private final static Logger log = Logger.getLogger(DBHelper.class.getName());

    public static Connection getConnection() {
        try {
            log.log(Level.FINE, "Getting a database connection");

            Context initContext = new InitialContext();

            Context envContext = (Context) initContext.lookup("java:/comp/env");

            DataSource ds = (DataSource) envContext.lookup("jdbc/cis320");

            Connection conn = ds.getConnection();
            return conn;
        }
        catch(Exception e) {
            log.log(Level.SEVERE, "Unable to get a database connection.", e);
            return null;
        }
    }
}
