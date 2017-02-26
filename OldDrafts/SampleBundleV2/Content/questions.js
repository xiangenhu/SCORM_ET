test.AddQuestion( new Question ("com.ONRET.SCORM2004.interactions.CB_Amplifier_1",
                                "CB_Amplifier Question 1 (MC)", 
                                QUESTION_TYPE_CHOICE,
                                new Array("Option 1", "Option 2", "Option 3"),
                                "Option 3",
                                "obj_CB_Amplifier")
                );
                
test.AddQuestion( new Question ("com.ONRET.SCORM2004.interactions.CB_Amplifier_2",
                                "CB_Amplifier Question 2 (True-False)",
                                QUESTION_TYPE_TF,
                                null,
                                true,
                                "obj_CB_Amplifier")
                );
                
test.AddQuestion( new Question ("com.ONRET.SCORM2004.interactions.CB_Amplifier_3",
                               "CB_Amplifier Question 3 (MC)",
                                QUESTION_TYPE_CHOICE,
                                new Array("First", "Middle", "Last"),
                                "First",
                                "obj_CB_Amplifier")
                );                                