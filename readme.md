# Sample-based text generator

[Use the generator](https://mcortes214.github.io/sample-based-text-generator/)

This is a Javascript program to procedurally generate text that resembles an input sample text. It was conceived as a tool for conlanging and other artistic uses, as it serves as a generator of random words seemingly pertaining to a certain language or language family, and more interestingly, it allows to blend the "feeling" of several languages, by inputting a sample text in more than one language.

This is achieved by implementing a very simple [Markov chain](https://en.wikipedia.org/wiki/Markov_chain): the program analyses the characters that compose the text in pairs, then identifies how often a given letter follows another letter, and finally uses that information to compose a new text in a probabilistic fashion. For example, if the input string is "ananas", there are two instances of "an" and one instance of "as", which means that there is a 66% chance of an A being followed by an N, and a 33% chance of it being followed by an S. Not only letters are considered characters, but also numbers and special characters such as parentheses, which are likewise analysed.
