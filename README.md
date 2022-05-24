# Netezza for VSCode

This is a query tool for Netezza (PureData, Netezza Performance Server, Cloud Pak for Data) databases.  While there is a database explorer it is _NOT_ meant for creating/dropping databases or tables.  The explorer is a visual aid for helping to craft your queries.

There is a language service that should keep at most a single connection open to the database (assuming one was selected).  This facilitates query diagnostics, code completion, and function signatures.  All code completion keywords, functions, tables, and field names are pulled from the current connection to try to keep everything relevant.

It is possible there are some queries that won't run and report problems - even if they are completely valid (`DROP DATABASE` comes to mind).

> *__Note__: As a first pass, only the most recent version of the Netezza Dialect is supported.*

## Features

* Management of Netezza connections
* List Servers/Database/Functions/Tables/Columns (primary key/type)
* Quickly select top * (with limit) of a table
* Run Queries
  * All queries in an nzsql file (; delimited)
  * Selected query in nzsql file
  * Selected query in ANY file (via context menu or command palette)
* Individual editors can have different connections
* Quickly change connection database by clicking the DB in the status bar
* Syntax Highlighting
* Connection aware code completion (keywords, functions, tables, and fields)
* In-line error detection powered by EXPLAIN (one error per query in editor)
* *__Basic__* function signature support (connection aware)

## Usage

### Managing Connections

You can add a Netezza connection in the explorer or via the command palette command "Netezza: Add Connection"

![connection](images/add_connection.gif)

You can remove connections from the connection context menu or the command palette command "Netezza: Delete Connection".

![delete_connection](images/delete_connection.gif)

Each item in the explorer has it's own context menu, and you can start a new query from _any_ level (or the command palette "Netezza: New Query").

The "Refresh Items" option reloads the sub-nodes for that item, useful if there were structural changes to the database and you want the explorer to reflect them.

Tables have the extra option to "Select Top 1000" or "Select Top...". They both open a new query with a "SELECT *" query started and run it.  The latter option will prompt you for the quantity first.

### Running Queries

Each editor window can have a different database and/or connection used for its queries.  All windows start with no connection selected.

![status](images/current_connection.png)

Clicking on the server ("localhost" above) or the database name will allow you to quickly change the database.  You can also initiate the change from the command palette.

Windows with their language set to Netezza will get syntax highlighting, and when there is connection selected: code completion, signature information, and diagnostics.

In Netezza language files you can run a query via F5, context menu, or command palette.  You can also run a query from any other file type as long as a connection is selected and you have the query selected - __*F5 will not work for other file types*__.

![run_queries](images/run_queries.gif)

Running queries in Netezza language files first check if anything is selected. If there is a selection, that is run as the query, otherwise all the queries in the editor are run.

Multiple queries are supported. If there is output from more than one query, multiple tables are shown in the results window.

### Serializing Query Results

You can serialize your query results as well.

![save_results](images/save_results.png)

If you have more than one table of results, you will be prompted for the table you wish to serialize.

You can choose from three formats: json, xml, and csv.  The results will be converted to the appropriate format and opened in a new editor of the selected type.

## Extension Settings

This extension contributes the following settings:

* `vscode-netezza.showExplorer`: enable/disable the database explorer.
* `vscode-netezza.prettyPrintJSONfields`: set to `true` to enable nicely formatted JSON in the query results window.
* `vscode-netezza.setConnectionFromExplorer`: set to `ifunset` to only set the query connection if not already set.
* `vscode-netezza.tableColumnSortOrder`: set to `db-order` to sort columns like the database does, `alpha` to sort alphabetically, and `reverse-alpha` for descending alphabetically.
* `vscode-netezza.intervalFormat`: set to `iso_8601` to format intervals according to the ISO 8601 standard, `humanize` to format as easy to read text, and `succinct` to format like a countdown clock.
* `vscode-netezza.virtualFolders`: set to array of virtual folders to be displayed under schema. Supported values for virtual folders are `functions`. Set to `null` or empty array `[]` to disable virtual folders.
* `vscode-netezza.defaultConnection`: set the default connection (by name) that should be used for any file.
* `vscode-netezza.defaultDatabase`: set the default database on the default connection that should be used for any file (must exist on server).

The base for this extension is the vscode-postgres project.  As the Netezza query language is based on an older dialect of PostgreSQL it is not likely that new features added to vscode-postgres will make it into this project.  Pull requests welcomed.

Thank you to Borvik and the rest of the vscode-postgres team for the head start.


