---
layout: page
title: About
#subtitle: I am a smart heading.
desc: About me.
permalink: /about/
---
<div class="pretty-links">

<div class="lead lead-about">
  I enjoy learning about Computation by applying my knowledge to games.
  In my free time I enjoy music and comedy.
</div>

{::nomarkdown}
<figure class="site-profile">
    <img src="{{ site.baseurl }}/assets/img/Turing_machine_Scan.jpg">
</figure>
{:/}

I recently graduated from Harvard University (B.A. Computer Science, 2017). There
I took classes in Systems, Functional Programming, Machine Learning and Artificial Intelligence.

Below are a few of my academic interests, as well as descriptions of some of my hobbies.

---

### Computation

#### Chess

Games might not seem very useful endeavor with regards to real-world applications.
 However, the same algorithms that we use to solve turn-based games can also help us 
 accomplish important 21st century tasks, like programming a robot to move, or
 providing TV show recommendations.

 As a simple{::nomarkdown}<sup><a id="asterisk" href="https://www.reddit.com/r/askscience/comments/mwoaw/is_it_possible_to_program_an_unbeatable_chess/c34h9gk/"><em style="font-size:9pt; text-decoration: none;">*</em></a></sup>{:/} example, Chess is a game that has been around 
 for centuries and has simple rules - yet it took until 1997 for a computer to beat the best chess
 grandmasters at their own game. These days, algorithms can run in one or two seconds
 and utterly obliterate even the best human competitors.

 Chess teaches us to deal with problems that are intractable - problems for which it is impossible to 
 find a theoretically perfect solution in a 'reasonable' amount of time. Although the number of chess 
 games is theoretically finite, there are so many combinations that no computer will ever be able to 
 find the absolute 'best' move before the sun turns into a red giant and engulfs our planet.

 Because of this conundrum, chess-playing algorithms can only search a few moves ahead and approximate
 how good a position this is. This method employs an algorithm called 'minimax', in which one player
 is trying to maximize the 'value' of the board, and the other player is trying to minimize this 'value'. You can try to beat my implementation [here](/chess/).

#### Theory - Differential Privacy

Differential Privacy is a field that deals with data anonymization. An important problem we 
face is that for some databases, we only want to return aggregate queries (queries about the entire database) while maintaining anonymity for each individual entry. 

I have done some preliminary research on this field because it is heavily related to NP-complete
problems. Following research with Dr. Salil Vadhan at Harvard, I have been independently interested in proving the complexity of a highly related problem known as 'Partial Discrepancy'. By showing that
problems like this are NP-complete, we can show that there will never exist an efficient algorithm 
to de-anonymize a sparse database using only aggregate queries (assuming &ne; NP).
See [This blog post](https://windowsontheory.org/2012/09/05/from-discrepancy-to-privacy-and-back/) by Kunal Talwar for more information on the status of this problem.


---

### Music

#### Jazz

In my free time I like to play and listen to Jazz music. I am a trumpet player and I played for
the Harvard Jazz band while in college. In addition, I am a former radio host of [WHRB Cambridge, 95.3FM](http://www.whrb.org/), where I hosted my own Jazz radio show for two hours a week.

#### Mariachi

{::nomarkdown}
<figure class="site-profile">
    <img src="{{ site.baseurl }}/assets/img/mariachi.jpg">
</figure>
{:/}

Mariachi is a traditional music style that originated in Mexico and has spread to greater Latin America.
 I have played trumpet for the [Harvard Mariachi](http://fb.me/MariachiVeritasdeHarvard) band, where I
 was able to share this unique and beloved music style with the greater Boston area.

#### Music Production

My 2018 New Year's Resolution is to make more music! I will be publishing new music every monday. Please feel free to take a listen <a href="/music/">here</a>.

<p>&nbsp;</p>
---

### Comedy

In my free time, I also enjoy writing and listening to various types of comedy. Whether it be TV, 
 written humor, or stand-up comedy, I love to laugh. I myself am an amateur stand-up comedian and
 I am excited to share my puns with anyone who is willing to listen.



