import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { categoriesM, dataG, feeds } from '../data';
import { parseString } from 'react-native-xml2js';
import { generateUID, ramdomize, timeSince } from '../utils';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import List from '../components/List';
import { ActivityIndicator } from 'react-native';

// import { XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser';

const News = () => {
    // const [data, setData] = useState([]);
    // const [data, setData] = useState(dataG);
    const [data, setData] = useState();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false)
    const [categoriesS, setCategories] = useState(categoriesM)
    // let time;
    const [time, setTime] = useState()

    // const [focus, setFocus] = useState(new Array(categoriesM.length).fill(0))
    const [focus, setFocus] = useState(new Array(categoriesS.length).fill(0))

    const [storeInfos, setStoreInfos] = useState()

    const [storeCategories, setStoreCategories] = useState()

    // const [tab, setTab] = useState()

    const [clicked, setCLicked] = useState(false)

    const [searchPhrase, setSearchPhrase] = useState("");

    const inputRef = useRef(null);

    const [reccurencesS, setReccurence] = useState()

    var d = new Date();
    d.setDate(d.getDate() - 1);

    const [step, setStep] = useState(0)

    const [past, setPast] = useState(0)

    const [disabled, setDisabled] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [loading, setLoading] = useState(false)

    const infosRef = useRef(null);

    const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]

    const [tireSize, setTireSize] = useState()




    // const [more, setMore] = useState([])
    // var more = []

    // const [stepDate, setStepDate] = useState(new Date())


    // console.log(reccurencesS.filter(v => v.nbInTitle > 1))

    // console.log(Object.entries(reccurencesS).filter(v => v[1].nbInTitle >2))
    // console.log(storeInfos.map(v => ({...v, description: "", html: ""})).reduce((a, v) => {

    // }))
    // console.log(storeInfos.map(v => timeSince(new Date(v.pubDate))))

    // words = [...new Set(storeInfos.flatMap(v => v.title.toLowerCase().split(' ')))]
    // .map(v => v.length>3?v:'').filter(v => v)

    // reccurences = words.reduce((a,v) => {
    //     if(!a[v])
    //         a[v] = 0
    //     a[v] = a[v] + 1
    //     return a;
    // }, {})

    // console.log(reccurences)

    // console.log('Bola Tinubu prive le Niger d’électricité, la junte'.split(' '))
    // console.log(storeInfos)
    // cat = []
    // storeInfos.forEach(v => {
    //     v.category.forEach(c => cat.push({
    //         category: c,
    //         link: v.link
    //     }))
    // })

    // console.log(cat)

    // console.log(categoriesS)

    // console.log(storeCategories)
    // console.log(storeCategories.map(v => v.category))

    // console.log(storeCategories.map(v => ({...v, category: v.category.toLowerCase()})).filter(v => v.category.includes('kylian mbappé')).map(v => ({...v, category: 'kylian mbappé'}) ))

    // keyword = (word, arr) => arr.map(v => ({ ...v, category: v.category.toLowerCase() })).filter(v => word.includes(v.category) && v.category !== word)[0]

    keyword1 = (word, arr) => arr.filter(v => word.includes(v.category) && v.category !== word && (v.category.length > 3))[0]

    // console.log(storeCategories)

    // reccurences = storeCategories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i, arr) => {
    //     let keyword = (keyword1(v.category, arr) || v).category
    //     if(!a[keyword])
    //         // a[keyword] = 0
    //         a[keyword] = {
    //             nb: 0,
    //             link: []
    //         }
    //     // a[keyword] = a[keyword] + 1

    //     // if(i < 2)
    //     // console.log(keyword, v.category)

    //     a[keyword] = {
    //         nb: a[keyword].nb + 1,
    //         link: [...new Set([...a[keyword].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
    //     }

    //     return a;
    // }, {})

    // Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length)
    // .forEach(v => {
    //     console.log(v)
    // })
    // console.log(reccurences)

    // Remove doublons categories à la FIN
    // // keyword('fondation kylian mbappé')
    // reccurences = storeCategories.map((v) => ({...v, category: v.category.toLowerCase()})).reduce((a,v, i, arr) => {
    //     // console.log(v.category)
    //     // if(!a[keyword(v.category, arr) || v.category])
    //     if(!a[v.category])
    //         a[v.category] = {
    //             nb: 0,
    //             link: []
    //         }
    //     a[v.category] = {
    //         nb: a[v.category].nb + 1,
    //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
    //     }
    //     return a;
    // }, {})

    // console.log(Object.entries(reccurences).filter(v => v[1].link.length >=3).sort((a, b) => b[1].link.length - a[1].link.length)
    // .reduce((a,v, i) => {
    //     console.log(v[0])
    //     if(!a[keyword(v[0], storeCategories) || v[0]])
    //         a[v[0]] = 0
    //     a[v[0]] = a[v[0]] + 1
    //     return a;
    // }, {}))


    // .forEach(v => {
    //     console.log(v)
    // })
    // console.log('c bon')
    // Object.entries(reccurences).sort((a, b) => b[1].link.length - a[1].link.length).forEach((v, i) => {
    //     if(i < 50)
    //     console.log(v)
    // })

    // console.log(focus, categoriesS.length)

    // console.log(focus.length)
    // console.log(data.length)

    // reccurences = categoriesS.reduce((a,v) => {
    //     if(!a[v])
    //         a[v] = 0
    //     a[v] = a[v] + 1
    //     return a;
    // }, {})

    // w = []

    // console.log([...w, 3])

    // console.log(categoriesS)

    // console.log(categoriesS.map(v => ({...v, category: v.category.toLowerCase()})))


    // reccurences = storeCategories.map(v => ({...v, category: v.category.toLowerCase()})).reduce((a,v, i) => {
    //     if(!a[v.category])
    //         a[v.category] = {
    //             nb: 0,
    //             link: []
    //         }
    //     a[v.category] = {
    //         nb: a[v.category].nb + 1,
    //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
    //     }
    //     return a;
    // }, {})

    // Object.entries(reccurences).filter(v => v[1].link.length >=3).sort((a, b) => b[1].link.length - a[1].link.length).forEach(v => {
    //     console.log(v)
    // })

    // console.log(Object.entries(reccurences).filter(v => v[1] > 10))

    // console.log("--------------------------------------------------")

    // console.log(categoriesS)

    // console.log(categoriesS.length)

    // console.log(data.length)


    const f = async () => {
        // setData(data => null)

        responses = [];
        responsesT = [];
        responsesTrace = []
        let promises = [];
        let promises1 = [];
        images = []
        // var d = new Date();
        categories = []
        // d.setDate(d.getDate() - 3);
        // console.log(d)
        // return 
        // response = await fetch('https://6129-45-154-138-154.ngrok-free.app/api')
        // fetch('https://6129-45-154-138-154.ngrok-free.app/api-one')
        for (const value of feeds) {

            promises.push(fetch(value.feed)
                .then(response => response.text())
                .then(textResponse => {
                    // console.log(textResponse)
                    parseString(textResponse, async function (err, result) {

                        j = 0;
                        try {
                            while (j < result.rss.channel[0].item.length) {
                                // if(!result){
                                //     console.log(textResponse.substring(0,80));
                                // }

                                try {
                                    // category = result.rss.channel[0].item[j].category

                                    // if(category.every(v => !v.toLowerCase().includes('politiq') && 
                                    // !v.toLowerCase().includes('afri')))
                                    // categories.push(category[0])
                                    // category.forEach(c => categories.push(c))


                                    // category.forEach(c => categories.push({
                                    //     category: c,
                                    //     link: result.rss.channel[0].item[j].link[0],



                                    // }));


                                    // categories.push({
                                    //     category,
                                    //     link: result.rss.channel[0].item[j].link[0],
                                    // })
                                    // console.log('in');
                                    // (async () => {
                                    // await null;
                                    // reccurences = categories.map(v => ({...v, category: v.category.toLowerCase()})).reduce((a,v, i) => {
                                    //     if(!a[v.category])
                                    //         a[v.category] = {
                                    //             nb: 0,
                                    //             link: []
                                    //         }
                                    //     a[v.category] = {
                                    //         nb: a[v.category].nb + 1,
                                    //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                    //     }
                                    //     return a;
                                    // }, {})

                                    // setCategories(Object.entries(reccurences).filter(v => v[1].link.length >=3).sort((a, b) => b[1].link.length - a[1].link.length))


                                    // })();
                                    //   setCategories(categories)

                                    // console.log(categories)


                                    // console.log(result.rss.channel[0].item[j].category.some(v => v.toLowerCase().includes('politiq')), result.rss.channel[0].item[j].category)
                                    // console.log(result.rss.channel[0].link[0].replace(/(https:\/\/)|(www.)|(\/$)|(\/.+)/g, ''))
                                    responses.push({
                                        title: result.rss.channel[0].item[j].title[0],
                                        creator: result.rss.channel[0].item[j]["dc:creator"],
                                        pubDate: result.rss.channel[0].item[j].pubDate,
                                        description: result.rss.channel[0].item[j].description,
                                        // domain: result.rss.channel[0].link[0].replace(/(https?:\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                        domain: result.rss.channel[0].link[0].replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                        id: generateUID(),
                                        link: result.rss.channel[0].item[j].link[0],
                                        category: result.rss.channel[0].item[j].category

                                        // image: res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', ''),
                                    });
                                    // console.log('LLLLLLLLLLLLLLLL', result.rss.channel[0].item[j].link[0])
                                    linkSource = result.rss.channel[0].item[j].link[0];

                                    promises1.push(fetch(linkSource)
                                        .then(res1 => res1.text())
                                        .then(res2 => {
                                            try {
                                                image = res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', '');
                                                link = res2.match(/<meta property="og:url" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', '');
                                                // contain = res2.match(/<p[^>]*>(.*?)<\/p>/g).some(v => v.includes('politiq'))
                                                // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/g).some(v => v.includes('politiq')), link)
                                                // console.log(link)
                                                // if(link.includes('zouzoua'))
                                                // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/g), link)
                                                // if(link === 'https://panoramapapers.com/cameroun-detention-abusive-la-sante-damadou-vamoulke-continue-de-se-degrader/')
                                                // console.log(res2.match(/<p[^>]*>(.*?)<\/p>/), link)
                                                // console.log(link)
                                                // console.log('======IMAGE', image)

                                                // console.log('=======URL', link)



                                                // setData([...data, responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0]])
                                                // console.log(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])
                                                // setData(data => [...data, responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0]])

                                                // if (responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0] === undefined)
                                                // console.log('LIIIIK PPPPBBBBB', link, image, responses)
                                                // responsesT.push(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])

                                                // ---- Condition Date et autres
                                                // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d) && contain).map(res => ({...res, image}))[0])

                                                // Condition Date
                                                // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({...res, image}))[0])


                                                // article = responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({ ...res, image }))[0]

                                                article = responses.filter(res => res.link.includes(link)).map(res => ({ ...res, image, html: res2 }))[0]


                                                article.category.forEach(c => categories.push({
                                                    category: c,
                                                    link: article.link,
                                                    title: article.title,
                                                    inTitle: article.title.toLowerCase().includes(c.toLowerCase())
                                                }))
                                                // responsesT.push(article)
                                                // if(responsesT.length === 2){
                                                //     responsesT.filter(v => v.domain === article.domain).forEach(v =>{
                                                //     console.log(v)
                                                //     console.log('========================')
                                                // })
                                                // }

                                                if (responsesT.filter(v => v.domain === article.domain).length < 3) {
                                                    if ((new Date(article.pubDate) > d))
                                                        responsesT.push(article)
                                                    // setData(responsesT.filter(v => v))
                                                }

                                                // ---- Sans Condition
                                                // responsesT.push(responses.filter(res => res.link.includes(link)).map(res => ({...res, image}))[0])

                                                // ramdomize(responsesT)

                                                // console.log(responsesT.length)

                                                responsesTrace.push(article)
                                                // console.log(responses.length, responsesTrace.length)

                                                // if (responsesTrace.length === 100) {
                                                    if (responsesTrace.length === 100) {

                                                    // setData(responsesTrace.filter(v => v))
                                                    console.log(focus.some(v => v))
                                                    // console.log(focus.filter(v => v)[0].text)
                                                    // if (focus.some(v => v) && new Date() - time < 200000) {
                                                    if (focus.some(v => v)) {
                                                        let data = responsesTrace.filter(v => v).filter(val => val.category.some(v => v.toLowerCase().includes(focus.filter(v => v)[0].text)) && new Date(val.pubDate) > d)
                                                        ramdomize(data)
                                                        // setData(data)
                                                        setData(data.filter((v, i) => i < 20))
                                                        setRefreshing(false)

                                                    } else {
                                                        ramdomize(responsesT)
                                                        // setData(responsesT)
                                                        setData(responsesT.filter((v, i) => i < 20))
                                                        setLoading(false)


                                                        // responsesTrace.forEach(v => {
                                                        //     v.category.forEach(c => categories.push({
                                                        //         category: c,
                                                        //         link: v.link
                                                        //     }))
                                                        // })


                                                        // reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i) => {
                                                        //     if (!a[v.category])
                                                        //         a[v.category] = {
                                                        //             nb: 0,
                                                        //             link: []
                                                        //         }
                                                        //     a[v.category] = {
                                                        //         nb: a[v.category].nb + 1,
                                                        //         link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                                        //     }
                                                        //     return a;
                                                        // }, {})

                                                        // Beta
                                                        reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i, arr) => {
                                                            let keyword = (keyword1(v.category, arr) || v).category
                                                            if (!a[keyword])
                                                                // a[keyword] = 0
                                                                a[keyword] = {
                                                                    nb: 0,
                                                                    link: [],
                                                                    nbInTitle: 0
                                                                }
                                                            // a[keyword] = a[keyword] + 1

                                                            // if(i < 2)
                                                            // console.log(keyword, v.category)

                                                            a[keyword] = {
                                                                nb: a[keyword].nb + 1,
                                                                link: [...new Set([...a[keyword].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])],
                                                                nbInTitle: v.inTitle ? a[keyword].nbInTitle + 1 : a[keyword].nbInTitle
                                                            }

                                                            return a;
                                                        }, {})

                                                        // Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length)
                                                        // .forEach(v => {
                                                        //     console.log(v)
                                                        // })

                                                        setFocus(focus => focus.map(v => 0))
                                                        setCategories(Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length))
                                                        setRefreshing(false)
                                                    }
                                                }

                                                setReccurence(reccurences)

                                                setStoreInfos(responsesTrace)

                                                // setStoreCategories(Object.entries(reccurences))
                                                setStoreCategories(categories)


                                                // if (responsesTrace.length === 100) {
                                                //     reccurences = categories.map(v => ({ ...v, category: v.category.toLowerCase() })).reduce((a, v, i) => {
                                                //         if (!a[v.category])
                                                //             a[v.category] = {
                                                //                 nb: 0,
                                                //                 link: []
                                                //             }
                                                //         a[v.category] = {
                                                //             nb: a[v.category].nb + 1,
                                                //             link: [...new Set([...a[v.category].link, v.link.replace(/(http(s?):\/\/)|(www.)|(\/$)|(\/.+)/g, '')])]
                                                //         }
                                                //         return a;
                                                //     }, {})
                                                //     console.log(reccurences)
                                                //     // setCategories(Object.entries(reccurences).filter(v => v[1].link.length >= 3).sort((a, b) => b[1].link.length - a[1].link.length))

                                                // }

                                                // if(responsesT.length === 100){
                                                //     ramdomize(responsesT)
                                                //     setData(responsesT.filter(v => v).filter((v, i) => i<20))
                                                //     // console.log(categories)

                                                // }


                                                // ramdomize(responsesT)
                                                // setData(responsesT.filter(v => v).filter((v, i) => i<20))
                                                // console.log(categories)




                                                // console.log(responsesT)
                                                // ----- Condition Politique
                                                // responsesT.push(responses.filter(res => res.link.includes(link) && (new Date(res.pubDate) > d)).map(res => ({...res, image}))[0])

                                                // responsesT = responsesT.filter(v => v);



                                                // if(responsesT.length === 10){
                                                // console.log(responsesT)
                                                // console.log(responsesT.filter(v => new Date(v.pubDate) > new Date("2023-07-27")))
                                                // console.log(responsesT.every(v => new Date(v.pubDate) > new Date("2023-07-26")))
                                                // setData(responsesT)
                                                // }

                                                // console.log({
                                                //     title: result.rss.channel[0].item[j].title[0],
                                                //     creator: result.rss.channel[0].item[j]["dc:creator"],
                                                //     pubDate: result.rss.channel[0].item[j].pubDate,
                                                //     description: result.rss.channel[0].item[j].description,
                                                //     link: result.rss.channel[0].link[j].replace(/(https:\/\/)|(www.)|(\/$)|(\/.+)/g, ''),
                                                //     id: generateUID(),
                                                //     image: res2.match(/<meta property="og:image" content=[^>]+>/)[0].match(/content="[^"]+"/)[0].replace('content="', '').replace('"', ''),
                                                // })

                                                // console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")


                                            } catch (err) { return err }

                                        })
                                        .catch(err => err)
                                    )
                                } catch (err) {
                                    // console.log(result.rss.channel[0].link)
                                    return err
                                }

                                j++
                            }
                            // console.log('=============================================================',)
                            // console.log(responses.length, j)
                            // console.log('=============================================================')
                        } catch (err) { return err }
                    })

                    // responses = responses.filter(res => new Date(res.pubDate) > d ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))

                    // responses = [responses[0], responses[1]]

                    // responses = responses.filter(res => (new Date(res.pubDate) > d) )
                    // ramdomize(responses)



                })
                .catch(err => err)
            )

        }

        // await Promise.all(promises).then(async () => {
        //     await Promise.all(promises1).then(() => {

        //         console.log('nice');
        //     // category.some(v => v.toLowerCase().includes('politiq'))
        //     // let data = responsesT.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        //     let data = responsesT;

        //     console.log(data)

        //     // Random
        //     for (i = data.length -1; i > 0; i--) {
        //         j = Math.floor(Math.random() * i)
        //         k = data[i]
        //         data[i] = data[j]
        //         data[j] = k
        //         }

        //     //   console.log(data)
        //     //  console.log(data.filter(v => v).filter(val => val.category.some(v => v.toLowerCase().includes('politiq'))))
        //     //  setData(data.filter(v => v).filter(val => val.category.some(v => {
        //     //     return [
        //     //         // 'politiq',
        //     //         'media'
        //     //         // 'afriq',

        //     // ].some(s => v.toLowerCase().includes(s))
        //     //  }

        //     //  )))

        //     //  console.log([...new Set(categories)])
        //     // console.log(categories)
        //         setData(data.filter(v => v))


        //     })



        //     })


    };

    // g = useCallback(() => {
    //     // console.log('updated')
    //     console.log(storeInfos?storeInfos.length:0)
    // },[storeInfos, setStoreInfos])

    // g()

    useEffect(() => {

        if (!time) {
            console.log(55)
            f();
            setTime(new Date())
        }
        // g();
        // console.log(storeInfos?storeInfos.length:0)
        // setInterval(() => {
        //     console.log(storeInfos?storeInfos.length:0)
        // }, 10000)

        //   .then((json) => setData(json));
    }, []);

    // const g = useCallback(() => {
    // //   console.log('c moi', data);
    // }, [data]);
    // g();
    // console.log('clicked', clicked)

    // console.log(storeInfos)



    return (
        <>
            <SearchBar setCLicked={setCLicked} setSearchPhrase={setSearchPhrase} inputRef={inputRef} f={f}
                loading={loading} setLoading={setLoading} />

            {clicked ? (<List
                searchPhrase={searchPhrase}
                // data={storeCategories}
                // dataDefault={categoriesS}
                // data={searchPhrase === ""?categoriesS.map(v => v[0]):[...new Set(storeCategories.map(v => v.category))].filter(v => v.split(' ').some(v => v.toUpperCase().startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) )}
                //Avec minuscule
                // data={searchPhrase === ""?categoriesS.map(v => v[0]):[...[...new Set(storeCategories.map(v => v.category)), ...[...new Set(storeInfos.flatMap(v => v.title.toLowerCase().split(' ')))].map(v => v.length>3?v:'').filter(v => v)] ].filter(v => v.split(' ').some(v => v.toUpperCase().startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) )}
                // data={searchPhrase === ""?categoriesS.map(v => v[0]):[...[...new Set(storeCategories.map(v => v.category)), ...[...new Set(storeInfos.flatMap(v => v.title.split(' ')).map(v => v.length>3?v:'').filter(v => v))] ] ].filter(v => v.split(' ').some(v => v.toUpperCase().startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) )}
                data={searchPhrase === "" ? categoriesS.map(v => v[0]) : [...new Set([...[...storeCategories.map(v => v.category), ...[...storeInfos.flatMap(v => v.title.split(' ')).map(v => v.length > 3 ? v.replace(/[,:]/g, '') : '').filter(v => v)]]])].filter(v => v.split(' ').some(v => v.toUpperCase().startsWith(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))))}

                setCLicked={setCLicked}
                inputRef={inputRef}
                storeInfos={storeInfos}
                setData={setData}
                setFocus={setFocus}
            />) : <></>}

            {!clicked && <View style={styles.container}
            // refreshControl={
            //     <RefreshControl
            //         refreshing={refreshing}
            //         onRefresh={() => {
            //             // fetchOrders(getOrdersListRefreshing);
            //             console.log('refresh')
            //         }}
            //     />
            // }
            >
                {/* <SearchBar /> */}
                <View style={styles.header}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={categoriesS}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            // console.log(categoriesS)
                            return <View style={{ ...styles.textContainer, borderBottomWidth: focus[index].border, borderColor: focus[index].color }}>

                                <TouchableOpacity onPress={() => {

                                    setFocus([...Array(index).fill(0), {
                                        border: 3,
                                        color: 'red',
                                        text: item[0]
                                    }, ...Array(focus.length - index).fill(0)])

                                    // console.log(storeInfos.length)
                                    let data = storeInfos.filter(val => val.category.some(v => v.toLowerCase().includes(item[0])) && new Date(val.pubDate) > d)
                                    ramdomize(data)
                                    // setData(data)
                                    setData(data.filter((v, i) => i < 20))
                                    infosRef.current.scrollToIndex({
                                        animated: true,
                                        index: 0,
                                    });
                                    // console.log(focus.filter(v => v).length)


                                }}>
                                    {/* <Text style={styles.text}>{item[0]}</Text> */}
                                    <Text style={styles.text}>{item[0].split(' ').map(s => s[0].toUpperCase() + s.slice(1)).map(s => s.split('-').map(t => t[0].toUpperCase() + t.slice(1)).join('-')).join(' ')}</Text>
                                </TouchableOpacity>

                            </View>
                        }}

                    />
                </View>


                <View style={styles.divider} />
                {/* <Text style={styles.tire}>Tirer pour actualiser</Text> */}
                {/* {data.map(item => {
                    console.log(item)
                    return(
                        <View key={item.id}>
                            <Text>{item.title}</Text>
                            <Image style={{width: 150, height: 150, marginBottom: 20}} source={{uri: item.image}} />

                        </View>
                    )
                })} */}
                {/* <Text>ccvvbcffhdghfhjjjjgkkjggjkjkkjkkkh</Text> */}
                {/* <View style={styles.tire}> */}
                {/* <View 
                    style={styles.tire}
                // style={
                //     [
                //         styles.tire,
                //         {
                //           transform: [{translateY: tireSize?tireSize*(-1): -22}],
                //         },
                //       ]
                // }
                // onLayout={(event) => {
                //     var {x, y, width, height} = event.nativeEvent.layout;

                //     setTireSize((height+5))
                //   }}
                  >
                    <Text style={styles.tirer}>Tirer pour actualiser</Text>
                </View> */}
                {/* {data ? <Animated.View 
                // style={value.getTranslateTransform()}
                
                style={[
                    value.getTranslateTransform(),
                    {
                      transform: [{translateY: -22}],
                    },
                  ]}
                > */}

                {data ?  
                    <FlatList
                        ref={infosRef}
                        bounces={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    // fetchOrders(getOrdersListRefreshing);
                                    // setRefreshing(true)
                                    console.log('refresh')
                                    console.log(time)
                                    console.log(new Date() - time)
                                    if (new Date() - time > 100000) {
                                        setRefreshing(true)
                                        f();
                                        // time = new Date()
                                        setTime(new Date())
                                    }

                                }}
                            />
                        }
                        // data={[{tire: "Tirer pour actualiser", id: 254}, ...data]}
                        data={data}
                        keyExtractor={(item, index) => {
                            // console.log(item.id, index, item)
                            // console.log('===============================================')
                            return item.id
                        }}
                        // onLayout={() => {
                        //     // var {x, y, width, height} = event.nativeEvent.layout;
                        //     infosRef.current.scrollToIndex({
                        //         animated: true,
                        //         index: 1,
                        //       });

                        // }}
                        // initialScrollIndex={1}
                        renderItem={({ item, index }) => {
                            // console.log(data.length)
                            // if(index === 4)
                            return <>
                                {/* {index === 0?<View style={styles.tire}>
                            <Text style={styles.tirer}>Tirer pour actualiser</Text>
                        </View>: */}
                                <TouchableOpacity
                                    disabled={disabled}
                                    style={{ backgroundColor: 'white' }}
                                    onPress={() => {
                                        navigation.navigate("Details", { item })
                                    }}>
                                    <View style={{ flexDirection: 'row', padding: 10 }}>
                                        <Text style={{ width: '70%', fontSize: 17, fontWeight: 'bold', paddingRight: 10, paddingLeft: 5 }}>{item.title}</Text>
                                        <View style={{ width: '30%', height: 100 }}>
                                            <Image style={{ width: '100%', height: '100%', borderRadius: 8 }} source={{ uri: item.image }} />
                                        </View>
                                    </View>
                                    <View style={styles.block}>
                                        <Text style={{ ...styles.domain, fontSize: 10 }}>{timeSince(new Date(item.pubDate))}</Text>
                                        <Text style={styles.domain}>{item.domain}</Text>
                                    </View>
                                    <View style={styles.divider} />
                                </TouchableOpacity>
                                {/* } */}
                            </>
                        }}
                        showsVerticalScrollIndicator={false}
                        // refreshing={true}
                        // onRefresh = {() => console.log('refresh')}
                        onScroll={(event) => {
                            // event.nativeEvent.contentOffset.y === 0 && console.log('top')
                            if (event.nativeEvent.contentOffset.y === 0) {
                                // setTireSize(tireSize => (-1)*tireSize)
                                // infosRef.current.scrollToIndex({
                                //     animated: true,
                                //     index: 1,
                                //   });

                                // Animated.timing(value, {
                                //     toValue: {x: 0, y: 50},
                                //     duration: 200,
                                //     useNativeDriver: true
                                //   }).start(() => {

                                //     Animated.timing(value, {
                                //         toValue: {x: 0, y: -22},
                                //         duration: 100,
                                //         useNativeDriver: true
                                //       }).start()
                                //   })

                            }
                        }}

                        onScrollBeginDrag={() => {
                            // setDisabled(true)
                            // console.log('start drag')
                        }}
                        onScrollEndDrag={() => {
                            // console.log('end drag')
                            // setDisabled(false)
                        }}

                        onEndReached={() => {

                            let d = new Date();
                            // d.setDate(d.getDate() - 3);
                            let array;
                            tab = []
                            arrayUniqueByKey = []
                            let p = past
                            while (arrayUniqueByKey.length < 2) {

                                d.setDate(d.getDate() - 1 - p);

                                if (arrayUniqueByKey.length >= 0 && tab.length !== 0) {
                                    tab = []
                                    p++
                                }
                                console.log('p', p, tab.length)
                                if (p > 50)
                                    array = storeInfos.filter(v => !data.includes(v)).filter(v => new Date(v.pubDate) > d)

                                if (p > 100)
                                    return;

                                if (focus.some(v => v) && p <= 50)
                                    array = storeInfos.filter(v => !data.includes(v)).filter(val => val.category.some(v => v.toLowerCase().includes(focus.filter(v => v)[0].text)) && new Date(val.pubDate) > d)
                                else
                                    array = storeInfos.filter(v => !data.includes(v)).filter(v => new Date(v.pubDate) > d)
                                // const key = 'domain';
                                // let tab = []
                                array.forEach(v => {
                                    if (tab.filter(u => u.domain === v.domain).length < 3) {
                                        tab.push(v)
                                        // console.log(v.domain)
                                    }
                                })
                                // uniq
                                const key = 'domain';

                                arrayUniqueByKey = [...new Map(tab.map(item =>
                                    [item[key], item])).values()];

                                console.log('uniq', arrayUniqueByKey.map(v => v.domain));

                                // p++

                            }
                            console.log('continue')
                            setPast(p)
                            ramdomize(tab)
                            // let tmp = storeInfos.slice(0, data.length+3)
                            // ramdomize(tmp)
                            // if(step <=12)
                            setData([...data, ...tab.slice(0, 3)])
                            console.log('end', step)

                            // console.log(data.length)
                            // console.log(storeInfos[0].title)
                            // step=step+1;
                            setStep(step => step + 1)





                        }}
                        ListFooterComponent={<ActivityIndicator size={'large'} />}
                    />
                    
                 
                    : <View style={styles.loading}><Image style={{ width: 200, height: 200 }} source={require('../assets/loading.gif')} /></View>}
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: '#f2f2f2',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    divider: {
        height: 5,
        backgroundColor: 'grey',
        opacity: 0.1
    },
    domain: {
        fontSize: 12,
        paddingBottom: 10,
        color: "grey",
        opacity: 0.7,
        // paddingLeft: 20,
    },
    tire: {
        // backgroundColor: '#f2f2f2',
        color: 'grey',
        position: 'relative',
        // flex: 1,
        // borderWidth: 1
        zIndex: -10
    },
    tirer: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },
    block: {
        flexDirection: "row",
        paddingLeft: 20,
        gap: 10
    },

    //====
    header: {
        height: 50,
        backgroundColor: 'white'
    },
    textContainer: {
        marginHorizontal: 20,
        justifyContent: "center",
    },
    text: {
        fontSize: 17,
        fontWeight: 500,
        color: "grey"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default News;