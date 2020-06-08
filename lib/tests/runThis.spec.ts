/**
 * this file is need as javascript mocha (test runner) module run files in lexicographical order
 * so always delete.js will run before post.js as d comes first . 
 * To prevent it, we need to write custom file whcih overwrites this inbuilt feature of mocha
 */

    require("./POST/post2XX")
    require("./POST/post4XX")

    require("./GET/get2XX")
    require("./GET/get4XX")
    require("./GET/getHTML")

    require("./PUT/put2XX")
    require("./PUT/put4XX")

    require("./DELETE/delete2XX");

