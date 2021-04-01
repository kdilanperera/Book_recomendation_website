        function myFunction() {
            var x = document.getElementById("firstname").value;
            // checks whether the name is not empty.
                if (x == "" || x == null) {
                alert("Name must be filled out");
                return false;
            }

            var y = document.getElementById("lastname").value;
            // checks whether the name is not empty.
                if (y == "" || y == null){
                alert("Last name must be filled out")
                return false;
            }

            var k=document.myform.email.value;  
            var atposition=k.indexOf("@");  
            var dotposition=k.lastIndexOf(".");
            // checks whether the email is not empty and in correct formate.  
                if (atposition<1 || dotposition<atposition+2 || dotposition+2>=k.length){
                alert("Please enter a valid e-mail address ");
                return false;  
            }  

            var i = document.getElementById("comment").value;
            // checks whether the comment section is not empty.
                if (i == "" || i == null) {
                alert("comment must be filled out");
                return false;
            }
                else{
                    alert("Dear " + " " + x +" " + y + ", Thank you very much for your feedback. you have commented us. " + " " + 
                    i + ".")
                }
        }

