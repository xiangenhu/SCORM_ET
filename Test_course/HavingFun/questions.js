test.AddQuestion( new Question ("com.scorm.golfsamples.interactions.transistor_1",
                                "The rules of golf are maintained by:'?",
                                QUESTION_TYPE_CHOICE,
                                new Array("The UN", "USGA and Royal and Ancient", "The PGA", "Each course has it's own rules"),
                                "USGA and Royal and Ancient",
                                "obj_transistor")
                );

test.AddQuestion( new Question ("com.scorm.golfsamples.interactions.transistor_2",
                                "A score of two under par on a given hole is known as a(n):",
                               QUESTION_TYPE_CHOICE,
                                new Array("opportity for improvement", "birdie", "double bogie", "eagle"),
                                "eagle",
                                "obj_transistor")
                );

test.AddQuestion( new Question ("com.scorm.golfsamples.interactions.transistor_3",
                                "A typical golf course has ____ holes",
                                QUESTION_TYPE_NUMERIC,
                                null,
                                18,
                                "obj_transistor")
                );

test.AddQuestion( new Question ("com.scorm.golfsamples.interactions.transistor_4",
                                "In stableford scoring, the highest score wins.",
                                QUESTION_TYPE_TF,
                                null,
                                true,
                                "obj_transistor")
                );

test.AddQuestion( new Question ("com.scorm.golfsamples.interactions.transistor_5",
                                "Par for a 175 yard hole is typically:",
                                QUESTION_TYPE_NUMERIC,
                                null,
                                3,
                                "obj_transistor")
                );
