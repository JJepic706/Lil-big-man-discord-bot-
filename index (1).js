//3.0.1
const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const keepAlive = require("./server")


let bot = new Client({
  fetchAllMembers: true, 
  presence: {
    status: 'online',
    activity: {
      name: `With your MOM`,
      type: 'PLAYING'
    }
  }
});

bot.setMaxListeners(0);

bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    switch (command) {

      case 'ping':
        let msg = await message.reply('Pinging...');
        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0)
          message.channel.send(args.join(' '));
        else
          message.reply('You did not send a message to repeat, cancelling command.')
        break


      case 'help':
        let embed =  new MessageEmbed()
          .setTitle('HELP MENU')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          embed
            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            embed
              .setTitle(`COMMAND - ${command}`)

            if (commands[command].aliases)
              embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }
  }
});

//say+
bot.on("message", message => {
  const args = message.content.split(" ").slice(1);
  if(message.content.startsWith('*say+')) {
      message.delete()
      var saytext = args.join(" ");
      message.channel.send(saytext)
  }
})

//roasts 
const messages = [
  "Wna scrap bro",
  "Your PP smal fam",
  "Il smok u",
  "My dad is Big man",
  "No No, your wrong",
   "Who?.... Cares.",
  "Who?.... Asked.",
  "If I wanted to kill myself, I would simply jump from your ego to your IQ",
  "You are what happens when women drink during pregnancy",
  "When I look at you, I wish I could meet you again for the first time… and walk past",
  "You are the sun in my life… now get 93 million miles away from me",
  "You have such a beautiful face… But let’s put a bag over that personality",
  "There is someone out there for everyone. For you, it’s a therapist",
  "I would smack you, but I’m against animal abuse",
  "I can’t wait to spend my whole life without you",
  "Whoever told you to be yourself, gave you a bad advice",
  "I didn’t mean to offend you… but it was a huge plus",
  "I don’t hate you, but if you were drowning, I would give you a high five",
  "If I throw a stick, will you leave me too?",
  "Sorry I can’t think of an insult dumb enough for you to understand",
  "I don’t know what makes you so stupid, but it works",
  "Whatever doesn’t kill you, disappoints me",
  "It is hilarious how you are trying to fit your entire vocabulary into one sentence",
  "I like the way you comb your hair, so horns don’t show up",
  "Have a nice day… somewhere else",
  "I would call you an idiot, but it would be an insult for stupid people",
  "I told my therapist about you; she didn’t believe me",
  "Did you know your incubator had tinted windows? That explains a lot",
  "The last time I saw something like you, it was behind metal grids",
  "If I had a dollar every time you shut up, I would give it back as a thank you",
  "You were so happy for the negativity of your Covid test, we didn’t want to spoil the happiness by telling you it was IQ test",
  "Honey, only thing bothering me is placed between your ears",
  "Only thing that is pleasing about our relationship is that you are no longer in it",
  "Every time I have a stick in my hand, you look like a pinata",
  "You are like a software update. every time I see you, I immediately think “not now”",
  "When I look at you, I think to myself where have you been my whole life? Can you go back there?",
  "You are the reason why there are instructions on shampoo bottles",
  "I think you just need a high five… in the face… with a chair",
  "When I listen to you, I think you really going to go far. I hope you stay there",
  "I look at you and think what a waste of two billion years of the evolution",
  "It would be a great day If you used a glue stick instead of Chapstick",
  "Yes, I’m fully vaccinated, but I will still not hang out with you",
  "When I see you coming, I get pre annoyed. I’m just giving myself a head start",
  "When I see you coming, I get pre annoyed. I’m just giving myself a head start",
  "You can’t imagine how much happiness you can bring… by leaving the room",
  "I know you don’t like me, that says a lot. You need to acquire a better taste",
  "It’s all about balance… you start talking, I stop listening",
  "Are you talking to me? I thought you only talk behind my back",
  "I’m sorry… did my back hurt your knife?",
  "Everyone is allowed to act stupid once, but you… you are abusing that privilege",
  "Cry me a river, then drown yourself in it",
  "Ola soy Dora. Can you help me find where we asked?",
  "Somewhere tree is producing oxygen for you. I’m sorry for it",
  "Earth is full. Go home",
  "Everyone has purpose in this life, yours is to become an organ donor",
  "I am jealous of people who didn’t meet you",
  "Why are you rolling your eyes? Are you looking for your brain?",
  "You didn’t change since last time I saw you. You should",
  "What is wrong with you? Have you had too many drugs in mental hospital today?",
  "It is better to shut your mouth and make people think you are stupid than open it and remove all doubt",
  "Hurting you is the least thing I want to do… but it’s still in the list",
  "Oh, sorry, did the middle of my sentence interrupted the beginning of yours?",
  "Let me tell you. If I don’t answer you the first time, what makes you think the next 25 will work?",
  "I am not ignoring you; I am just giving you a time to understand what you just said",
  "Every time I think you can’t get any dumber, you are proving me wrong",
  "Where is your off button?",
  "Your as useless as the 'ueue' in 'queue'",
  "Mirrors can't talk... Lucky for you they can't laugh either",
  "Hey, you have something on you chin... No, the third one down",
  "Your the reason the gene pool needs a lifeguard",
  "If I had a face like yours, I'd sue my parents",
  "Your only chance of getting laid is to crawl up a chickens butt and wait",
  "someday you will go far and I hope you saty there",
  "you must have been born on the highway cos' thats where most accidents happen",
  "If laughter is the best medicine, your face is the cure to cancer",
  "I'm glad to see your not letting education get in the way of your ignorance",
  "Is your ass jelous of the amount of shit that just came out your mouth?",
  "I'd argure with you but then we would both be wrong",
  "When I see your face there's not a thing I would change... other than the direction I am walking in",
  "If I had a dollar for every time you said something smart, I would be broker than a homeless person",
  "When you were born the doctor threw you out the window and the window threw you back in",
  "You’re the reason God created the middle finger",
  "Your secrets are always safe with me. I never even listen when you tell me them",
  "You bring everyone so much joy when you leave the room",
  "I may love to shop but I will never buy your bull",
  "I’d give you a nasty look but you’ve already got one",
  "Were you born this stupid or did you take lessons?",
  "The people who tolerate you on a daily basis are the real heroes",
  "You should really come with a warning label",
  "I don’t know what your problem is, but I’m guessing it’s hard to pronounce",
  " If I wanted to hear from an asshole, I’d fart",
  "You look like something that came out of a slow cooker",
  "I will ignore you so hard you will start doubting your existence",
  "Feed your own ego. I’m busy",
  "I’ll never forget the first time we met. But I’ll keep trying",
  "You’re my favorite person… besides every other person I’ve ever met",
  "You’re impossible to underestimate",
  "If you were an inanimate object, you’d be a participation trophy",
  "Take my lowest priority and put yourself beneath it",
  "You are a pizza burn on the roof of the world’s mouth",
  "I hope your wife brings a date to your funeral",
  "If genius skips a generation, your children will be brilliant",
  "I don’t have the time or the crayons to explain this to you",
  "You’re a grey sprinkle on a rainbow cupcake",
  "I thought of you today. It reminded me to take out the trash",
  "You are so full of shit, the toilet’s jealous",
  "Stupidity isn’t a crime, so you’re free to go",
  "Don’t you get tired of putting makeup on your two faces every morning?",
  "Too bad you can’t Photoshop your ugly personality",
  "Do your parents even realize they’re living proof that two wrongs don’t make a right?",
  "Jesus might love you, but everyone else definitely thinks you’re an idiot",
  "You see that door? I want you on the other side of it",
  "You’re like the end pieces of a loaf of bread. Everyone touches you, but nobody wants you",
  " If you’re going to act like a turd, go lay on the yard",
  "You are more disappointing than an unsalted pretzel",
  "Your face makes onions cry",
  "Don’t worry about me. Worry about your eyebrows",
  "Your family tree must be a cactus ‘cause you’re all a bunch of pricks",
  "You look like a ‘before’ picture",
  "Light travels faster than sound which is why you seemed bright until you spoke",
  "Hold still. I’m trying to imagine you with personality",
  "You are the human version of period cramps",
  "Aww, it’s so cute when you try to talk about things you don’t understand",
  " Hey, your village called – they want their idiot back",
  "Good story, but in what chapter do you shut up?",
  "There are some remarkably dumb people in this world. Thanks for helping me understand that",
  "You’re about as useful as an ashtray on a motorcycle",
  "You’ll never be the man your mom is",
  "You need a kiss on the neck from a crocodile",
  "May both sides of your pillow be uncomfortably warm",
  "I hope you step on a Lego",
  "Your parents aren't even disappointed in you, they know this is you at your best",
  "I hope they make a movie about your life and cast James Corden to play you",
  "When I look at you my penis becomes inverted",
  "I would roast you but i dont wanna waste my time on a plebeian like you",
  "Roses are red, violets are blue, I thank god everyday im not as ugly as you",
  "You look like a mystery solving lesbian from 1960",
  "You have the facial features of several muppets put in a blender, before being loaded into a shotgun and fired at your face",
  "You could have bitched out this time too and Reddit still wouldn't care",
  "You look like a purposely exaggerated Mii that a little kid would make of his older brother when he's mad at him",
  "Your so dumb even twitter disagrees with you",
  "If your brain was dynamite, there wouldn’t be enough to blow your hat off",
  "You are more disappointing than an unsalted pretzel.",
  "Light travels faster than sound, which is why you seemed bright until you spoke.",
  "You are so annoying, you make your Happy Meals cry",
  "You have so many gaps in your teeth it looks like your tongue is in jail",
  "Your secrets are always safe with me. I never even listen when you tell me them",
  "Your face makes onions cry",
  "It’s impossible to underestimate you",
  "I’m not insulting you; I’m describing you",
  "I’m not a nerd; I’m just smarter than you",
  "Don’t be ashamed of who you are. That’s your parents’ job",
  "You are the human version of period cramps",
  "If you’re going to be two-faced, at least make one of them pretty",
  "You are like a cloud. When you disappear, it’s a beautiful day",
  "I’d rather treat my baby’s diaper rash than have lunch with you",
  "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that?",
  "OH MY GOD! IT SPEAKS!",
  "Child, I’ve forgotten more than you ever knew",
  "You just might be why the middle finger was invented in the first place",
  "I was today years old when I realized I didn’t like you",
  "I’m busy right now, can I ignore you another time?",
  "I wish I had a flip phone, so I could slam it shut on this conversation",
  "You’re cute. Like my dog. He also chases his tail for entertainment",
  "You have an entire life to be an idiot. Why not take today off?",
  "If you’re going to be two-faced, at least make one of them pretty",
  "The only way you would ever get hurt during an activity is if the TV exploded",
  "Beauty is only skin deep, but ugly goes clean to the bone",
  "When you look in the mirror, say hi to the clown you see in there for me, would you?",
  "You have miles to go before you reach mediocre",
  "I’m just glad that you’re stringing words into sentences now",
  "You are proof God has a sense of humor",
  "Grab a straw, because you suck",
  "Your only chance of getting laid is to crawl up a chicken butt and wait",
  "You’re about as useful as a screen door on a submarine.",
  "I believed in evolution until I met you",
  "I do not consider you a vulture. I consider you something a vulture would eat",
  "If I throw a stick, will you leave?",
  "I would prefer a battle of wits, but you appear unarmed",
  "I like the way you try.",
  "I envy those who haven't met you",
  "You look like something I would draw with my left hand",
  "I would never date you. I’m lonely, not desperate",
  "I’d say you’re ‘dumb as a rock,’ but at least a rock can hold a door open",
  "I bet your parents change the subject when their friends ask about you",
  "You’re a conversation starter. Not when you are around, but once you leave",
  "First off: Brush your teeth",
  "You are the reason why shampoo has instructions",
  "I’d give you a nasty look, but you’ve already got one",
  "You should really come with a warning label",
  "If I wanted to hear from an asshole, I’d fart",
  "I will ignore you so hard you will start doubting your existence",
  "Stupidity isn’t a crime, so you’re free to go",
  "The people who tolerate you on a daily basis are the real heroes",
  "Isn’t there a bullet somewhere you could be jumping in front of?",
  "You look like a ‘before’ picture",
  "I could eat a bowl of alphabet soup and poop out a smarter statement than whatever you just said",
  "Your only purpose in life is to become an organ donor",
  "You’re about as useful as an ashtray on a motorcycle.",
  "You fear success, but you really have nothing to worry about",
  "The last time I saw a face like yours, I fed it a banana",
  "As an outsider, what do you think of the human race?",
  "Don’t feel bad. A lot of people have no talent",
  "Don’t try to think too hard. You’re so stupid it might sprain your brain.",
  "Did your parents ever ask you to run away from home?",
  "I have seen people like you. But I had to pay admission",
  "Two wrongs don’t make a right. Take your parents, for instance",
  "I’d slap you but I don’t want to make your face look any better",
  "I will slap you so hard even Google won’t be able to find you",
  "You have a face even a mother couldn't love",
  "If I said anything to offend you it was purely intentional",
  "I hope your next blowjob is from a shark",
  "You’re a bad person. Enough said",
  "You’re the type of person who can’t read the room. You don’t understand when you aren’t wanted",
  "I hope one day you choke on the shit you talk",
  "There is a differance between wearning make up and lo0oking like you got gang banged by a crayola",
  "Your farther should of wiped you on his sheet"

]


bot.on("message", msg => {
  if (msg.content === "*roast me") {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    msg.reply(randomMessage);
  }
})

bot.on('message', message => {
    if (message.author.bot) return;
    const randomMessage2 = messages[Math.floor(Math.random() * messages.length)];
    let mention = message.mentions.users.first()
    
    if (message.content.startsWith("*roast") && mention) {
        message.channel.send(`${mention}, ${randomMessage2}`)
}});




//Yo momma jokes
const messages2 = [
  "Yo momma is so fat when she got on the scale it said, 'I need your weight not your phone number.'",
  "Yo momma is so fat, I took a picture of her last Christmas and it's still printing",
  "Yo momma is so fat that when she went to the beach a whale swam up and sang, 'We are family, even though you're fatter than me.'",
  "Yo mamma is so ugly when she tried to join an ugly contest they said, Sorry, no professionals.",
  "Yo momma's so fat and old when God said, Let there be light, he asked your mother to move out of the way.",
  "Yo momma's so fat, that when she fell, no one was laughing but the ground was cracking up",
  "Yo momma is so fat when she sat on WalMart, she lowered the prices",
  "Yo momma is so fat that Dora can't even explore her!",
  "Yo momma is so stupid when an intruder broke into her house, she ran downstairs, dialed 9-1-1 on the microwave, and couldn't find the 'CALL' button.",
  "Your momma is so ugly she made One Direction go another direction",
  "Yo momma is so fat her bellybutton gets home 15 minutes before she does",
  "Yo momma's so stupid, she put two quarters in her ears and thought she was listening to 50 Cent.",
  "Yo momma so stupid she stuck a battery up her ass and said, 'I GOT THE POWER!'",
  "Yo momma's so dumb, when y'all were driving to Disneyland, she saw a sign that said 'Disneyland left', so she went home.",
  "Yo momma is so hairy, when she went to the movie theater to see Star Wars, everybody screamed and said, 'IT'S CHEWBACCA!'",
  "Yo momma is so stupid she climbed over a glass wall to see what was on the other side",
  "Yo mamma is so fat she doesn't need the internet, because she's already world wide",
  "Yo momma is so stupid she brought a spoon to the super bowl",
  "Yo Momma's so fat when I told her to touch her toes she said, 'What are those'?",
  "Yo momma is so fat, when she sat on an iPod, she made the iPad!",
  "Yo momma is so fat when she went to KFC the cashier asked, 'What size bucket?'' and yo momma said, 'The one on the roof.'",
  "Yo momma is so stupid she took a ruler to bed to see how long she slept",
  "Yo momma's so fat she needs cheat codes for Wii Fit",
  "Yo momma's so fat, that when she went to the zoo, the hippos got jealous",
  "Yo momma so fat she broke the stairway to heaven",
  "ur mom so ugly god turned of the light",
  "ur mom so stupid she went to the dentist to get bluetooth",
  "Your moms so old, her bible is signed by jesus",
  "What does a rolloer coster and your mom have in coomon? I ride em both",
  "Yo momma's so dumb her brain cells are on the endangered species list",
  "Yo momma's so dumb her brain cells die ALONE",
  "Yo momma's so dumb I found her peaking over a glass wall to see what was on the other side",
  "Yo momma's so dumb I saw her jumping up and down asked what she was doing and she said she drank a bottle of medicine and forgot to shake it",
  "Yo momma's so dumb I saw her walking down the street yelling into an envelope asked what she was doing and she said sending a voice mail",
  "Yo momma's so dumb I think its a new world record",
  "Yo momma's so dumb I told her Christmas was just around the corner and she went looking for it",
  "Yo momma's so dumb I told her drinks were on the house so she went and got a ladder",
  "Yo momma's so dumb it takes her an hour to cook minute rice",
  "Yo momma's so dumb she asked for a refund on a jigsaw puzzle complaining it was broken",
  "Yo momma's so dumb she brought a doughnut back to the shop cause it had a hole in it",
  "Yo momma's so dumb she called the cocaine hotline to order some",
  "Yo momma's so dumb she make Homer Simpson look like a Nobel Prize winner",
  "Yo momma's so dumb she used tipex on a computer screen"

]

bot.on("message", msg => {
  if (msg.content === "*yo momma") {
    const randomMessage2 = messages2[Math.floor(Math.random() * messages2.length)];
    msg.reply(randomMessage2);
  }
})


//Pick up lines
const messages3 = [
  "I hope you know CPR, because you just took my breath away!",
  "So, aside from taking my breath away, what do you do for a living?",
  "I ought to complain to Spotify for you not being named this week’s hottest single",
  "Are you a parking ticket? ‘Cause you’ve got ‘fine’ written all over you",
  "Your eyes are like the ocean; I could swim in them all day",
  "Well, here I am. What are your other two wishes?",
  "Hey, my name's Microsoft. Can I crash at your place tonight?",
  "Are you French? Because Eiffel for you",
  "Do you like raisins? How do you feel about a date?",
  "There is something wrong with my cell phone. It doesn't have your number in it.",
  "If I could rearrange the alphabet, I’d put ‘U’ and ‘I’ together",
  "Aside from being sexy, what do you do for a living?",
  "I must be a snowflake, because I've fallen for you",
  "Are you from Tennessee? Because you're the only 10 I see!",
  "If you were a Transformer… you’d be Optimus Fine",
  "I wish I were cross-eyed so I can see you twice",
  "I must be in a museum, because you truly are a work of art",
  "Do you believe in love at first sight—or should I walk by again?",
  "I'm no photographer, but I can picture us together",
  "Feel my shirt. Know what it’s made of? Boyfriend material",
  "Are you related to Jean-Claude Van Damme? Because Jean-Claude Van Damme you’re sexy!",
  "If you were a chicken, you’d be impeccable",
  "Did your license get suspended for driving all these guys crazy?",
  "I’m learning about important dates in history. Wanna be one of them?",
  "Baby, if you were words on a page, you’d be fine print",
  "Did you just come out of the oven? Because you’re hot.",
  "It’s a good thing I have my library card because I am totally checking you out",
  "I was blinded by your beauty; I’m going to need your name and phone number for insurance purposes",
  "I was wondering if you had an extra heart. Because mine was just stolen",
  "Is your name Google? Because you have everything I’ve been searching for",
  "Are you a bank loan? Because you got my interest",
  "Are you a time traveler? Cause I see you in my future!",
  "Can I follow you where you’re going right now? Because my parents always told me to follow my dreams",
  "Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical",
  "Life without you is like a broken pencil…pointless",
  "Something’s wrong with my eyes because I can’t take them off you",
  "My love for you is like diarrhea, I just can't hold it in",
  "Somebody better call God, because he’s missing an angel",
  "We’re not socks, but I think we’d make a great pair",
  "You must be tired because you've been running through my mind all night",
  "Do you have a map? I keep getting lost in your eyes",
  "Do you have a BandAid? I just scraped my knee falling for you",
  "Do you like Star Wars? Because Yoda only one for me",
  "Did you invent the airplane? Because you seem Wright for me",
  "Did the sun come out or did you just smile at me?",
  "You’re so beautiful that you made me forget my pickup line",
  "I was wondering if you could tell me: If you’re here, who’s running Heaven?",
  "My friends bet me I couldn’t talk to the prettiest girl in the bar. Want to use their money to buy some drinks?",
  "Trust me, I’m not drunk; I’m just intoxicated by you",
  "I seem to have lost my number—can I have yours?",
  "I was just trying to buy a drink here, but you’re very distracting",
  "Are you any good at boxing? Because you look like a knockout",
  "It’s never easy meeting a complete stranger—especially one as beautiful as you—without being properly introduced. But can we try anyway?",
  "Do I know you...? Oh, sorry, it’s just that you look just like my next girlfriend.",
  "You’re so hot, my zipper is falling for you",
  "They say that kissing is a language of love, so would you mind starting a conversation with me?",
  "I’m on top of things. Would you like to be one of them?",
  "Are you an eco-friendly kind of girl? The condom in my pocket goes expires tomorrow, so why don’t you help me use it?",
  "Is your name winter? Because you’ll be coming soon",
  "Do you want to commit a sin for your next confessional?",
  "I’m not into watching sunsets, but I’d love to see you go down",
  "Are you an exam? Because I have been studying you like crazy",
  "Can you tell me what time you’ll come back to my place, please?",
  "Give me your car keys so I can drive you crazy.",
  "Is your name Earl Grey? Because you look like a hot-tea!",
  "I love my bed, but I’d rather be in yours",
  "Your body is 70 percent water… and I’m thirsty",
  "Your outfit would look great on my bedroom floor",
  "I know a great way to burn off the calories in that drink",
  "With school, I just want an A. With you, I just want to F",
  "I’m not feeling myself today. Can I feel you instead?",
  "Hey, are you a guitar? Cuz I wanna finger you and listen to the noises you make",
  "I wanna fuck you!",
  "Hey... I have the Lego Death star",
  "Can I touch your tiddies?",
  "Twinkle twinkle little star, Can we do it in my car",
  "My fleshlight is broken, Can i use your mouth?",
  "There’s hexagon, octagon But when I look at you it’s myheartagon",
  "You always fill up my head mind giving me some?",
  "Hey girl, are you a noose? Because you're breathtaking",
  "Do you ever go into the kitchen in the middle of the night drunk and realize that you’re the only snacc in the house?",
  "That dress is quite becoming on you... And if I was on you, I'd be cumming too",
  "Give me your car keys so that I can drive you crazy!",
  "Do you know the melting point of a human heart? Don't know about others. But for me it's your smile ;)",
  "Hey girl are you A marble floor? Cause I am slipping and falling for you",
  "Hey girl are you A Road? Cause you flat as fuck, yet jammed with people",
  "Hey girl are you A Bus? Cause I am pretty sure, your're filled with middle aged men inside you",
  "Hey girl are you Petrol? Cause if the middle easterns see you, they gonna dig deep",
  "Hey girl are you Petrol? Cause if the middle easterns see you, they gonna dig deep",
  "Hey girl are you A door? The doorway to my Hevean",
  "I didn’t know what I wanted in a woman until I saw you",
  "Do you have a name, or can I just call you \‘mine?\’",
  "You know, I’m actually terrible at flirting. How about you try to pick me up instead?",
  "You look like you know how to have a good time. Been on any adventures lately?",
  "If I were to ask you out on a date, would your answer be the same as the answer to this question?",
  "I wish I’d paid more attention to science in high school, because you and I’ve got chemistry and I want to know all about it",
  "Excuse me, I don’t mean to intrude, but you owe me a drink, because when I saw you, I dropped mine",
  "I’m surprised the restaurant/bar/etc. hasn’t asked you to leave yet. You’re so beautiful you’re making all the other girls look bad.",
  "If you let me borrow a kiss, I promise I’ll give it right back",
  "You must be a hell of a thief, because you managed to steal my heart from across the room",
  " In my opinion, there are three kinds of beautiful: Cute, pretty, and sexy. Somehow, you manage to be all three.",
  "I swear someone stole the stars from the sky and put them in your eyes",
  "I don’t know which is prettier today—the weather, or your eyes",
  "I think the only way you could possibly be more beautiful is if I got to know you",
  "If beauty were time, you’d be eternity.",
  "If I had a nickel for every time I saw someone as beautiful as you, I’d still only have five cents",
  "The sparkle in your eyes is so bright, the sun must be jealous",
  "I just had to tell you, your beauty made me truly appreciate being able to see.",
  "I can’t tell if that was an earthquake, or if you just seriously rocked my world",
  "What does it feel like to be the most gorgeous girl in the room?",
  "Hi, I’m Lil big man. Do you remember me? Oh, that’s right—we’ve only met in my dreams",
  "Hi, I’m (your name). Do you remember me? Oh, that’s right—we’ve only met in my dreams",
  "Your hand looks heavy—can I hold it for you?",
  "If you were a taser, you’d be set to \‘stun.\’"
]

bot.on("message", msg => {
  if (msg.content === "*pick up line") {
    const randomMessage3 = messages3[Math.floor(Math.random() * messages3.length)];
    msg.reply(randomMessage3);
  }
})

//jokes
const messages4 = [
  "Why did the chicken cross the road...? To get to your mums house",
  "Your life",
  "Your dick size",
  "Girls are like KFC, once you are finished with the breasts and thighs there's a greasy bowl to put your bone in",
  "I just got my doctor’s test results and I’m really upset about it. Turns out, I’m not gonna be a doctor.",
  "My grief counselor died. He was so good, I don’t even care",
  "Today, I asked my phone “Siri, why am I still single?” and it activated the front camera.",
  "A man wakes from a coma. His wife changes out of her black clothes and, irritated, remarks, \“I really cannot depend on you in anything, can I!\”",
  "As I get older, I remember all the people I lost along the way. Maybe my budding career as a tour guide was not the right choice.",
  "I was digging in our garden and found a chest full of gold coins. I wanted to run straight home to tell my wife about it. Then I remembered why I was digging in our garden",
  "The doctor gave me some cream for my skin rash. He said I was a sight for psoriasis",
  "Don’t challenge Death to a pillow fight. Unless you’re prepared for the reaper cushions.",
  "I don’t have a carbon footprint. I just drive everywhere.",
  "Even people who are good for nothing have the capacity to bring a smile to your face, like when you push them down the stairs.",
  "A man walks into an enchanted forest and tries to cut down a talking tree. \“You can’t cut me down,\” the tree exclaims, \“I’m a talking tree!\” The man responds, \“You may be a talking tree, but you will dialogue.\”",
  "My mom died when we couldn’t remember her blood type. As she died, she kept telling us to “be positive,” but it’s hard without her.",
  "What does your dad have in common with Nemo? They both can’t be found",
  "I visited my new friend in his apartment. He told me to make myself at home. So I threw him out. I hate having visitors.",
  "When my Uncle Frank died, he wanted his cremations to be buried in his favorite beer mug. His last wish was to be Frank in Stein",
  "Do you know the phrase “One man’s trash is another man’s treasure”? Wonderful saying, horrible way to find out that you were adopted.",
  "My husband left a note on the fridge that said, \“This isn’t working.\” I’m not sure what he’s talking about. I opened the fridge door and it’s working fine!",
  "Why did the man miss the funeral? He wasn’t a mourning person",
  "It’s important to establish a good vocabulary. If I had known the difference between the words “antidote” and “anecdote,” one of my best friends would still be alive.",
  "Want to know how you make any salad into a caesar salad? Stab it twenty-three times.",
  "When I see the names of lovers engraved on a tree, I don’t find it cute or romantic. I find it weird how many people take knives with them on outings.",
  "Give a man a match, and he’ll be warm for a few hours. Set him on fire, and he will be warm for the rest of his life.",
  "When does a joke become a dad joke? When it leaves you and never comes back",
  "The doctor gave me one year to live, so I shot him with my gun. The judge gave me 15 years. Problem solved",
  "Where did Joe go after getting lost on a minefield? Everywhere",
  "You know you’re not liked when you get handed the camera every time they take a group photo",
  "What’s red and bad for your teeth? A brick",
  "My grandfather said my generation relies too much on the latest technology. So I unplugged his life support",
  "A emo asked a tree for a high five, the tree left em hanging",
  "What where the emo's doing in the forest? Hanging out",
  "What’s the best thing about Switzerland? I don’t know, but the flag is a big plus.",
  "I invented a new word! Plagiarism!",
  "What did the killer say in the hospital? ICU",
  "How do you donate money to the taliban? Just pay your taxes in the USA",
  "Whats a smart person called in america? An immigrant",
  "How do you stop a taliban bingo game? You yell B-52!",
  "Why is dark spelt with a \'c\' insted of a \'k\'? Because you cant \'c\' in the dark",
  "Stephen hawking walks into a bar... Oh wait he cant",
  "The wife has just phoned me to tell me that 3 women in her office have received flowers today and they are absolutely gorgeous... I said, \"That's probably why !!\"",
  "A deaf guy walks into a bar, The bartender says",
  "Some jerk took all my money, called me fat and stabbed me in the arm... I hate doctors appointments",
  "A sperm donor, a carpenter and Julius Caesar Walked into a bar.... He came, he saw, he conquered.",
  "I thought opening a door for a lady was good manners, but she just screamed and flew out of the plane",
  "My girlfriend dumped me, so I stole her wheelchair. Guess who came crawling back?",
  "‘You the bomb.’ ‘No, you the bomb.’A compliment in the US, an argument in the Middle East.",
  "My girlfriend’s dog died, so I bought her another, identical one. She just screamed at me and said: \“What am I meant to do with two dead dogs?!?\”",
  "My therapist said time heals all wounds. So I stabbed her",
  "What does tofu and a dildo have in common? They both are meat substitutes"

]

bot.on("message", msg => {
  if (msg.content === "*joke") {
    const randomMessage4 = messages4[Math.floor(Math.random() * messages4.length)];
    msg.reply(randomMessage4);
  }
})

//Big man quotes 
const messages5 = [
  "Choke me like you love me!",
  "Stigma in the streets, Beta in the sheets",
  "I like fanny and tits :D",
  "I dont make decisions until stomach is full or my balls are empty",
  "The biggest step in any relationship isnt the first kiss... its the first fart",
  "If the big bang happened 13.6 billion years ago and matter cannot be created or destroyed... and we are made of matter. That means we are all 13.6 billion years old. So yes she was old enough",
  "Sometimes I respond with 'Huh' and then respond before they finish responding... Im not deaf my brain is just lagging like a 20th centery dell PC",
  "What doesn't kill you makes you want to kill yourself",
  "I hope your grandma gets bullied at bingo",
  "Water and cereal isnt that bad",
  "Every time my grandmother and I were at a wedding she’d say: “you’re next”. So I started saying the same thing to her at funerals",
  "Before I met my wife, I was incomplete, Now im finished",
  "My girlfriend and I laugh at how competitive we are; but I laugh harder",
  "It takes guts to be an organ donor",
  "Shut up and get happy",
  "I hate when people say \"if your friends jumped off a bridge would you?\" because obviously not... I would jump first im a leader not follower",
  "Its better to cum in the sink, rather than sink in the cum",
  "Life is like a roller coaster. You never know when its gonna end",
  "Grab a straw, because you suck!",
  "You look like a ‘before’ picture",
  "I hope your next blowjob is from a shark",
    "Bitch please... You birth certificate is an apology from the condom factory",
  "If you where a vegetable you would be a cabbitch",
  "Life is full of dissapointments and I just added you to the list",
  "Hold up... Im tryna decide whether I dont give a shit or dont give a fuck",
  "Your mum should of swallowed you "
]

bot.on("message", msg => {
  if (msg.content === "*quote") {
    const randomMessage5 = messages5[Math.floor(Math.random() * messages5.length)];
    msg.channel.send(randomMessage5);
  }
})

//Deez nuts 
const messages6 = [
  "Hey are you going to that saw con convension? Whats saw con you ask... saw-con deez nuts",
  "Excuse me but do you Bofa? (Bofa? I don't think so?) Bofa deez nuts!",
  "Hey, are you familar with Landon? (Landon who?) Slip, fall then landon deez nuts!",
  "Do you remember that guy Willya? (Willya who?) Willya put deez nuts in your mouth",
  "Excuse me but do you like pudding? (Yes, of course.) Well how about pudding deez nuts in your mouth.",
  "Roses are red, covid is the flu, can I quarentine DEEZ NUTS inside of you",
  "Have you considered leaving? (Leaving what?) Leaving deez nuts in your mouth",
  "Have you heard about the news in Kenya today? (No, tell me more) Well, Kenya fit deez nuts in your mouth",
  "How do you say “Yes, you look good” in Spanish? (Si…) See Deez Nuts!",
  "I am so sick of this. This sucks! (What sucks?) You suck on Deez Nuts!",
  "Hey, do you smell that? (Nope. What does it smell like?) It smells like Deez Nuts!",
  "Don’t sit on that! (Sit on what?) SIT ON Deez Nuts",
  "Can you move that? (Move what?) Move Deez Nuts!",
  "Hey Paul, is Phil there? (There’s no Phil here…) PHIL Deez Nuts!",
  "Hey pal, I heard that you are Dee’s friend. (Who’s Dee?) Deez Nuts!",
  "Can you imagine dragons flying in the sky? (Yes, I can.) Then Imagine dragging Deez Nuts across your mouth",
  "Hey bro, I need some of these. (Some of what?) Soma Deez Nuts",
  "Do you like tulips? (Yes, why?) Cus you’re gonna love your two lips on Deez Nuts!",
  "Did you like the plot in this film? (Nah. I believe we can come up with a better one.) So you want to come and film Deeeeeez Nuts!"

]

bot.on("message", msg => {
  if (msg.content === "*deez nuts") {
    const randomMessage6 = messages6[Math.floor(Math.random() * messages6.length)];
    msg.reply(randomMessage6);
  }
})

//coolinator

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*how cool") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% cool!`)
        
    } else if (message.content === "*how cool"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% cool!:sunglasses:`)
}});

//poggers calculator

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*how POG") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% POGCHAMP`)
        
    } else if (message.content === "*how POG"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% POGCHAMP`)
}});

//simp calculator

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*how simp") && mention) {
        message.channel.send(`${mention} is a ${Math.floor(Math.random() * 100) + 1}% simp`)
        
    } else if (message.content === "*how simp"){
        message.channel.send(`You are a ${Math.floor(Math.random() * 100) + 1}% Simp`)
}});

//sigma calculator

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*how sigma") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% a sigma male`)
        
    } else if (message.content === "*how sigma"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% a sigma male`)
}});

//chad calculator 

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*how CHAD") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% a CHAD`)
        
    } else if (message.content === "*how CHAD"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% a CHAD`)
}});

//Vigin calculator

 bot.on('message', message => {
    if (message.author.bot) return;

    let mention = message.mentions.users.first()

    if (message.content.startsWith("*virgin test") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% a MEGA virgin`)
        
    } else if (message.content === "*virgin test"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% a MEGA virgin`)
}});

//how gay

bot.on('message', message => {
  if (message.author.bot) return;

  let mention = message.mentions.users.first()

  if (message.content.startsWith("*how gay") && mention) {
        message.channel.send(`${mention} is ${Math.floor(Math.random() * 100) + 1}% gay`)
        
    } else if (message.content === "*how gay"){
        message.channel.send(`You are ${Math.floor(Math.random() * 100) + 1}% gay`)
}});

//dev notes
bot.on("message", msg => {
  if (msg.content === "*dev notes") {
    msg.channel.send("Aloha, Creator of Lil big man here!, Im glad you chose to add this bot to your server so thanks. Any issues, DM me @JJepic#2420. Anyway, try mentioning someone after a 'how' command, its another feature they all the how commands have but I decided to not add to the help menu (how cool @{user}). The quotes are random stuff I have heared or seen on the internet and thought where funny if you where wondering what they are lol. If a command doesn't work, check puntuation and capitalization cuz it is sensitive, write it like its writen in the help menu. Please don't be offended by anything cuz its all meant to be a memes/for the laughs and thanks for adding my bot to your server :)");
  }
})

//welcome msg
bot.on('guildCreate', msg => {
  msg.systemChannel.send("hey thx 4 inviting me 2 da server. To see what I can do use *help");
})


//Eater eggs

bot.on("message", msg => {
  if (msg.content === "*Lil big man best") {
    msg.reply("Congratulations... Secret unlocked! POG POG POG... Hecking into the POGGERS BIOS... Plz wait")
    msg.reply("POGCHAMP BIOS Succesfully hecked, Inserting new data...")
    msg.reply("You have succsesfully been added to the POGCHAMP list and you are now an official POGCHAMP :)")
  }
})

bot.on("message", msg => {
  if (msg.content === "JJepic706 is awesome") {
    msg.reply("yes, you are 100% correct");
  }
})

bot.on("message", msg => {
  if (msg.content === "JJepic706 smells") {
    msg.reply("No fam don't diss my boi you are 100% Incorrect");
  }
})

bot.on("message", msg => {
  if (msg.content === "Josh smells") {
    msg.reply("No fam don't diss my boi you are 100% Incorrect");
  }
})

bot.on("message", msg => {
  if (msg.content === "CODY") {
    msg.reply("from english");
  }
})

bot.on("message", msg => {
  if (msg.content === "cody") {
    msg.reply("sweats ultrakill");
  }
})

bot.on("message", msg => {
  if (msg.content === "Reub") {
    msg.reply("smells");
  }
})

bot.on("message", msg => {
  if (msg.content === "REUB") {
    msg.reply("Mega-virgin");
  }
})


keepAlive()
bot.login(config.token);