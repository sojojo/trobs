import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './tailwind.css';

function Result({ result_meta }){
  return (
    <div className="p-5 flex flex-col rounded-lg bg-secondary transition-all hover:shadow-2xl hover:bg-gray-800">
     <div className="text-lg mb-1 font-semibold leading-tight">
      { result_meta.name }
     </div>
     <p className="text-muted text-sm">
      { result_meta.author }
     </p>
     <p className="text-muted text-sm">
      X downloads
     </p>
     <div className="py-3 leading-tight">
      { result_meta.description }
     </div>
     <div className="text-center mt-auto">
      <div className="flex-1 flex gap-4 mt-3">
       <a className="block button py-1.5 text-sm shadow" href="#">
        Install
       </a>
       <a className="ml-auto block text-muted font-medium py-1.5 text-sm" href={ result_meta.link } target="_blank">
        Learn more
       </a>
       <a className="flex text-muted font-medium py-1.5 text-sm transition-all duration-300" href="#">
        Copy link
       </a>
      </div>
     </div>
    </div>
  )
}

function ResultsDisplay({ query, results, setResults }){

  const url = `https://api.trieve.ai/api/chunk/search`
  const tr_headers = {
    'Authorization': 'tr-fTc046hbE6cYBrYsGoyzoQNkqtCAbWyH',
    'Content-Type': 'application/json',
    'TR-Dataset': '98d5f5aa-4f78-488d-9b9a-06e218296d36'
  }
  let page_count = 0;
  let total_page_count = 0;
  let items = [];

  do {
    let tr_body = JSON.stringify({
      date_bias: false,
      get_collisions: true,
      highlight_delimiters: [
        "?",
        ",",
        ".",
        "!"
      ],
      highlight_results: true,
      page: page_count+1,
      page_size: 50,
      get_total_pages: true,
      query: query,
      score_threshold: 0.75,
      search_type: "semantic",
      use_weights: true
    })

    // NOTE: can't get the `total_chunk_pages` value, so pagination doesn't work

    useEffect(() => {
      fetch(url, { 
        method: 'POST',
        headers: tr_headers, 
        body: tr_body
      }).then(res => res.json())
        .then(data => { setResults(data.score_chunks); });
    }, [tr_body]);

    console.log(results);

    
    for (let i = 0; i < results.length; i++) {
      let result_meta = results[i].metadata[0].metadata;
      items.push(<Result 
        result_meta={ result_meta }
      />);
    }
    page_count = page_count + 1;
    total_page_count = results.total_page_count;
  } while(page_count < total_page_count);

  return (
    <div className="plugins-container container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      { items }
    </div>
  )
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([])

  return (
    <html lang="en">
     <head>
      <meta charSet="utf-8"/>
      <title>
       Plugins - Obsidian
      </title>
      <meta content="With hundreds of plugins and our open API, it's easy to tailor Obsidian to fit your personal workflow." name="description"/>
      <meta content="width=device-width, initial-scale=1" name="viewport"/>
      <link href="tailwind.css" rel="stylesheet"/>
      <link href="/favicon.ico" rel="icon" sizes="32x32"/>
      <link href="/favicon.svg" rel="icon" sizes="any" type="image/svg+xml"/>
      <link href="/apple-touch-icon.png" rel="apple-touch-icon"/>
      <link href="/feed.xml" rel="alternate" title="Obsidian Blog" type="application/atom+xml"/>
      <link href="/feed.json" rel="alternate" title="Obsidian Blog" type="application/feed+json"/>
      <link href="/changelog.xml" rel="alternate" title="Obsidian Changelog" type="application/atom+xml"/>
      <link href="/changelog.json" rel="alternate" title="Obsidian Changelog" type="application/feed+json"/>
      <meta content="Plugins - Obsidian" property="og:title"/>
      <meta content="With hundreds of plugins and our open API, it's easy to tailor Obsidian to fit your personal workflow." property="og:description"/>
      <meta content="website" property="og:type"/>
      <meta content="https://obsidian.md/images/banner.png" property="og:image"/>
      <meta content="Plugins - Obsidian" name="twitter:title"/>
      <meta content="With hundreds of plugins and our open API, it's easy to tailor Obsidian to fit your personal workflow." name="twitter:description"/>
      <meta content="@obsdmd" name="twitter:site"/>
      <meta content="obsidian.md" name="twitter:domain"/>
      <meta content="@obsdmd" name="twitter:creator"/>
      <meta content="summary_large_image" name="twitter:card"/>
      <meta content="https://obsidian.md/images/banner.png" name="twitter:image"/>
     </head>
     <body className="theme-dark">
      <div className="">
       <div className="header-height">
       </div>
       <header className="header">
        <div className="container flex items-center justify-between">
         <div className="flex items-center">
          <a aria-label="Go to the Obsidian home page" className="header-logo mr-4 flex items-center gap-x-2 transition-colors" href="/" style={{ marginTop:'-3px' }}>
           <svg alt="Obsidian" height="22" viewBox="0 0 143 25" width="126" xmlns="http://www.w3.org/2000/svg">
            <path d="m6.91927 14.5955c.64053-.1907 1.67255-.4839 2.85923-.5565-.71191-1.7968-.88376-3.3691-.74554-4.76905.15962-1.61678.72977-2.9662 1.28554-4.11442.1186-.24501.2326-.47313.3419-.69198.1549-.30984.3004-.60109.4365-.8953.2266-.48978.3948-.92231.4798-1.32416.0836-.39515.0841-.74806-.0148-1.08657-.099-.338982-.3093-.703864-.7093-1.1038132-.5222-.1353116-1.1017-.0165173-1.53613.3742922l-5.15591 4.638241c-.28758.25871-.47636.60929-.53406.99179l-.44455 2.94723c.69903.6179 2.42435 2.41414 3.47374 4.90644.09364.2224.1819.4505.26358.6838z" fill="#A88BFA">
            </path>
            <path d="m2.97347 10.3512c-.02431.1037-.05852.205-.10221.3024l-2.724986 6.0735c-.279882.6238-.15095061 1.3552.325357 1.8457l4.288349 4.4163c2.1899-3.2306 1.87062-6.2699.87032-8.6457-.75846-1.8013-1.90801-3.2112-2.65683-3.9922z" fill="#A88BFA">
            </path>
            <path d="m5.7507 23.5094c.07515.012.15135.0192.2281.0215.81383.0244 2.18251.0952 3.29249.2997.90551.1669 2.70051.6687 4.17761 1.1005 1.1271.3294 2.2886-.5707 2.4522-1.7336.1192-.8481.343-1.8075.7553-2.6869l-.0095.0033c-.6982-1.9471-1.5865-3.2044-2.5178-4.0073-.9284-.8004-1.928-1.1738-2.8932-1.3095-1.60474-.2257-3.07497.1961-4.00103.4682.55465 2.3107.38396 5.0295-1.48417 7.8441z" fill="#A88BFA">
            </path>
            <path d="m17.3708 19.3102c.9267-1.3985 1.5868-2.4862 1.9352-3.0758.1742-.295.1427-.6648-.0638-.9383-.5377-.7126-1.5666-2.1607-2.1272-3.5015-.5764-1.3785-.6624-3.51876-.6673-4.56119-.0019-.39626-.1275-.78328-.3726-1.09465l-3.3311-4.23183c-.0117.19075-.0392.37998-.0788.56747-.1109.52394-.32 1.04552-.5585 1.56101-.1398.30214-.3014.62583-.4646.95284-.1086.21764-.218.4368-.3222.652-.5385 1.11265-1.0397 2.32011-1.1797 3.73901-.1299 1.31514.0478 2.84484.8484 4.67094.1333.0113.2675.0262.4023.0452 1.1488.1615 2.3546.6115 3.4647 1.5685.9541.8226 1.8163 2.0012 2.5152 3.6463z" fill="#A88BFA">
            </path>
            <path d="m39.752 4.5038c-5.952 0-10.248 3.744-10.248 8.88s4.296 8.88 10.248 8.88c5.928 0 10.224-3.744 10.224-8.88s-4.296-8.88-10.224-8.88zm0 3.47999c3.576 0 6.144 2.13601 6.144 5.40001s-2.568 5.4-6.144 5.4c-3.6 0-6.168-2.136-6.168-5.4s2.568-5.40001 6.168-5.40001z" fill="currentColor">
            </path>
            <path d="m55.4847 20.5598c.864.936 2.472 1.704 4.584 1.704 4.32 0 6.8401-2.976 6.8401-6.576 0-3.624-2.5201-6.60001-6.8401-6.60001-2.112 0-3.72.79201-4.584 1.70401v-6.02401h-3.84v17.23201h3.84zm-.12-4.944c0-1.992 1.704-3.432 3.912-3.432 2.112 0 3.888 1.248 3.888 3.504s-1.776 3.48-3.888 3.48c-2.208 0-3.912-1.416-3.912-3.408z" fill="currentColor">
            </path>
            <path d="m67.3181 19.9118c1.464 1.488 4.272 2.352 7.2 2.352 3.96 0 6.936-1.44 6.936-4.392 0-2.88-2.832-3.432-6.072-3.816-2.736-.312-3.576-.384-3.576-1.08 0-.648.864-1.056 2.496-1.056 1.968 0 3.672.6 4.824 1.656l1.992-2.304c-1.272-1.224-3.648-2.18401-6.624-2.18401-4.008 0-6.48 1.72801-6.48 4.32001 0 2.712 2.52 3.312 5.544 3.696 2.832.336 4.032.336 4.032 1.176 0 .792-1.056 1.128-2.784 1.128-2.16 0-4.152-.672-5.664-2.064z" fill="currentColor">
            </path>
            <path d="m82.8395 8.05579h3.912v-3.288h-3.912zm3.864 1.29601h-3.84v12.648h3.84z" fill="currentColor">
            </path>
            <path d="m99.8264 20.5598v1.44h3.8396v-17.23201h-3.8396v6.02401c-.864-.912-2.472-1.70401-4.584-1.70401-4.32 0-6.84 2.97601-6.84 6.60001 0 3.6 2.52 6.576 6.84 6.576 2.112 0 3.72-.768 4.584-1.704zm.12-4.944v.144c0 1.992-1.704 3.408-3.912 3.408-2.112 0-3.888-1.224-3.888-3.48s1.776-3.504 3.888-3.504c2.208 0 3.912 1.44 3.912 3.432z" fill="currentColor">
            </path>
            <path d="m105.996 8.05579h3.912v-3.288h-3.912zm3.864 1.29601h-3.84v12.648h3.84z" fill="currentColor">
            </path>
            <path d="m116.863 22.2638c2.232 0 4.056-.648 5.208-1.656.648 1.2 2.184 1.92 4.992 1.392v-2.832c-1.344.288-1.632-.024-1.632-.696v-4.608c0-3.168-2.376-4.77601-6.408-4.77601-3.48 0-6.264 1.51201-7.056 3.79201l3.456.936c.384-.984 1.704-1.704 3.432-1.704 2.04 0 2.856.768 2.856 1.728v.072l-5.04.456c-2.976.288-5.16 1.512-5.16 3.984 0 2.496 2.232 3.912 5.352 3.912zm4.848-5.112c0 1.464-2.184 2.304-4.152 2.304-1.488 0-2.328-.432-2.328-1.248 0-.84.672-1.152 1.992-1.272l4.488-.456z" fill="currentColor">
            </path>
            <path d="m128.379 21.9998h3.84v-6.048c0-2.184 1.2-3.456 3.288-3.456 1.968 0 3 1.296 3 3.432v6.072h3.84v-7.2c0-3.504-2.232-5.71201-5.52-5.71201-2.04 0-3.624.76801-4.608 1.80001v-1.536h-3.84z" fill="currentColor">
            </path>
           </svg>
          </a>
          <ul className="hidden md:flex">
           <li>
            <a className="px-3 py-2 font-medium text-gray-400" href="/download">
             Download
            </a>
           </li>
           <li>
            <a className="px-3 py-2 font-medium text-gray-400" href="/pricing">
             Pricing
            </a>
           </li>
           <li>
            <a className="px-3 py-2 font-medium text-gray-400" href="/sync">
             Sync
            </a>
           </li>
           <li>
            <a className="px-3 py-2 font-medium text-gray-400" href="/publish">
             Publish
            </a>
           </li>
          </ul>
         </div>
         <div className="ml-auto md:hidden z-10 text-gray-200 hover:text-gray-100">
          <a aria-label="Open the navigation menu" className="header-mobile-nav" href="#">
           <div className="header-mobile-nav-button">
            <div className="header-mobile-nav-button-inner">
            </div>
           </div>
          </a>
         </div>
         <div className="ml-auto hidden md:block">
          <a className="px-3 py-2 font-medium text-gray-400" href="/community">
           Community
          </a>
          <a className="px-3 py-2 font-medium text-gray-400" href="/account">
           Account
          </a>
         </div>
        </div>
       </header>
       <div className="header-mobile-nav-menu fixed top-0 right-0 bottom-0 left-0 overflow-scroll overscroll-contain block md:hidden">
        <div className="container py-4">
         <ul className="text-lg font-medium gap-2 grid mb-4">
          <li>
           <a className="flex button-primary rounded hover:text-normal p-3 items-center gap-2" href="/download">
            <svg className="lucide lucide-arrow-down-circle icon" data-lucide="arrow-down-circle" fill="none" height="24" icon-name="arrow-down-circle" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="12" r="10">
             </circle>
             <path d="M12 8v8">
             </path>
             <path d="m8 12 4 4 4-4">
             </path>
            </svg>
            Download the app
           </a>
          </li>
          <li>
           <a className="flex button-primary rounded hover:text-normal p-3 items-center gap-2" href="/account">
            <svg className="lucide lucide-user-round icon" data-lucide="user-round" fill="none" height="24" icon-name="user-round" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <circle cx="12" cy="8" r="5">
             </circle>
             <path d="M20 21a8 8 0 0 0-16 0">
             </path>
            </svg>
            Account
           </a>
          </li>
         </ul>
         <div className="text-muted text-sm mt-8">
          Add-ons
         </div>
         <ul className="text-lg font-medium gap-2 grid grid-cols-2 my-4">
          <li>
           <a className="flex rounded bg-secondary p-3 items-center gap-3" href="/sync">
            <svg className="lucide lucide-refresh-cw text-accent icon" data-lucide="refresh-cw" fill="none" height="24" icon-name="refresh-cw" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8">
             </path>
             <path d="M21 3v5h-5">
             </path>
             <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16">
             </path>
             <path d="M8 16H3v5">
             </path>
            </svg>
            Sync
           </a>
          </li>
          <li>
           <a className="flex rounded bg-secondary p-3 items-center gap-3" href="/publish">
            <svg className="lucide lucide-send text-accent icon" data-lucide="send" fill="none" height="24" icon-name="send" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <path d="m22 2-7 20-4-9-9-4Z">
             </path>
             <path d="M22 2 11 13">
             </path>
            </svg>
            Publish
           </a>
          </li>
          <li>
           <a className="flex rounded bg-secondary p-3 items-center gap-3" href="/pricing">
            <svg className="lucide lucide-coins text-accent icon" data-lucide="coins" fill="none" height="24" icon-name="coins" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <circle cx="8" cy="8" r="6">
             </circle>
             <path d="M18.09 10.37A6 6 0 1 1 10.34 18">
             </path>
             <path d="M7 6h1v4">
             </path>
             <path d="m16.71 13.88.7.71-2.82 2.82">
             </path>
            </svg>
            Pricing
           </a>
          </li>
          <li>
           <a className="flex rounded bg-secondary p-3 items-center gap-3 current" href="/plugins">
            <svg className="lucide lucide-puzzle text-accent icon" data-lucide="puzzle" fill="none" height="24" icon-name="puzzle" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
             <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z">
             </path>
            </svg>
            Plugins
           </a>
          </li>
         </ul>
         <div className="text-muted text-sm mt-8">
          Learn more
         </div>
         <ul className="font-medium text-sm gap-2 grid grid-cols-2 my-4 pb8">
          <li>
           <a className="block rounded bg-secondary p-3" href="https://help.obsidian.md" target="_blank">
            Help
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/blog">
            Blog
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/about">
            Manifesto
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="https://discord.gg/obsidianmd" rel="noopener noreferrer" target="_blank">
            Discord
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/changelog">
            Changelog
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/roadmap">
            Roadmap
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/softwear">
            Merch store
           </a>
          </li>
          <li>
           <a className="block rounded bg-secondary p-3" href="/community">
            Report a bug
           </a>
          </li>
         </ul>
        </div>
       </div>
       <div className="container">
        <div className="mt-12 mb-6">
         <h1 className="text-title mb-6">
          Plugins
         </h1>
         <div className="mb-4 text-2xl">
          Explore
          <span className="plugin-count">
           1,686 plugins
          </span>
          Obsidian plugins made by the community.
         </div>
         <div className="py-6">
          <a className="button button-primary mr-2" href="https://docs.obsidian.md" target="_blank">
           API Docs
          </a>
          <a className="button button-primary" href="/community">
           Join the community
          </a>
         </div>
         <p>
          <input className="plugin-search text-xl w-full rounded-3xl max-w-2xl px-6" placeholder="Search plugins..." value={ query } onChange={e => setQuery(e.target.value)} type="text"/>
         </p>
        </div>
       </div>
       
       <ResultsDisplay 
          query={ query }
          results={ results }
          setResults={ setResults }
       />
       
       <div className="container flex flex-row-reverse flex-wrap pt-24 pb-12 sm:pt-24 md:pb-32">
        <div className="grid grid-cols-2 gap-3 gap-y-6 md:grid-cols-3 justify-between w-full mb-24 ml-auto md:w-3/5 lg:w-1/2 md:mb-0 leading-loose md:leading-relaxed md:pl-6">
         <div>
          <ul className="">
           <li className="text-gray-500 mb-3">
            Get started
           </li>
           <li>
            <a className="font-medium" href="/download">
             Download
            </a>
           </li>
           <li>
            <a className="font-medium" href="/pricing">
             Pricing
            </a>
           </li>
           <li>
            <a className="font-medium" href="/account">
             Account
            </a>
           </li>
          </ul>
          <ul className="mt-8">
           <li className="text-gray-500 mb-3">
            Obsidian
           </li>
           <li>
            <a className="font-medium" href="/">
             Overview
            </a>
           </li>
           <li>
            <a className="font-medium" href="/sync">
             Sync
            </a>
           </li>
           <li>
            <a className="font-medium" href="/publish">
             Publish
            </a>
           </li>
           <li>
            <a className="font-medium" href="/canvas">
             Canvas
            </a>
           </li>
           <li>
            <a className="font-medium" href="/mobile">
             Mobile
            </a>
           </li>
           <li>
            <a className="font-medium current" href="/plugins">
             Plugins
            </a>
           </li>
          </ul>
         </div>
         <div>
          <ul className="">
           <li className="text-gray-500 mb-3">
            Learn
           </li>
           <li>
            <a className="font-medium" href="https://help.obsidian.md/" target="_blank">
             Help
            </a>
           </li>
           <li>
            <a className="font-medium" href="https://docs.obsidian.md/" target="_blank">
             Developers
            </a>
           </li>
           <li>
            <a className="font-medium" href="/changelog">
             Changelog
            </a>
           </li>
           <li>
            <a className="font-medium" href="/about">
             About
            </a>
           </li>
           <li>
            <a className="font-medium" href="/roadmap">
             Roadmap
            </a>
           </li>
           <li>
            <a className="font-medium" href="/blog">
             Blog
            </a>
           </li>
          </ul>
          <ul className="mt-8">
           <li className="text-gray-500 mb-3">
            Legal
           </li>
           <li>
            <a className="font-medium" href="/license">
             License overview
            </a>
           </li>
           <li>
            <a className="font-medium" href="/terms">
             Terms of service
            </a>
           </li>
           <li>
            <a className="font-medium" href="/privacy">
             Privacy
            </a>
            <span className="text-gray-600">
             /
            </span>
            <a className="font-medium" href="/security">
             Security
            </a>
           </li>
          </ul>
         </div>
         <div>
          <ul className="">
           <li className="text-gray-500 mb-3">
            Community
           </li>
           <li>
            <a className="font-medium" href="/community">
             Join the community
            </a>
           </li>
           <li>
            <a className="font-medium" href="/brand">
             Brand guidelines
            </a>
           </li>
           <li>
            <a className="font-medium" href="/softwear">
             Merch store
            </a>
           </li>
           <li>
            <a className="font-medium" href="https://discord.gg/obsidianmd" rel="noopener noreferrer" target="_blank">
             Discord
            </a>
           </li>
           <li>
            <a className="font-medium" href="https://forum.obsidian.md" target="_blank">
             Forum
            </a>
            <span className="text-gray-600">
             /
            </span>
            <a className="font-medium" href="https://forum-zh.obsidian.md" target="_blank">
             中文论坛
            </a>
           </li>
           <li className="hidden">
            <a className="font-medium" href="https://www.reddit.com/r/ObsidianMD/" rel="noopener noreferrer" target="_blank">
             Reddit
            </a>
           </li>
          </ul>
         </div>
        </div>
        <div className="mr-auto">
         <a aria-label="Go to the Obsidian home page" className="header-logo mr-4 flex items-center gap-x-2 transition-colors" href="/">
          <svg alt="Obsidian" height="22" viewBox="0 0 143 25" width="126" xmlns="http://www.w3.org/2000/svg">
           <path d="m6.91927 14.5955c.64053-.1907 1.67255-.4839 2.85923-.5565-.71191-1.7968-.88376-3.3691-.74554-4.76905.15962-1.61678.72977-2.9662 1.28554-4.11442.1186-.24501.2326-.47313.3419-.69198.1549-.30984.3004-.60109.4365-.8953.2266-.48978.3948-.92231.4798-1.32416.0836-.39515.0841-.74806-.0148-1.08657-.099-.338982-.3093-.703864-.7093-1.1038132-.5222-.1353116-1.1017-.0165173-1.53613.3742922l-5.15591 4.638241c-.28758.25871-.47636.60929-.53406.99179l-.44455 2.94723c.69903.6179 2.42435 2.41414 3.47374 4.90644.09364.2224.1819.4505.26358.6838z" fill="#A88BFA">
           </path>
           <path d="m2.97347 10.3512c-.02431.1037-.05852.205-.10221.3024l-2.724986 6.0735c-.279882.6238-.15095061 1.3552.325357 1.8457l4.288349 4.4163c2.1899-3.2306 1.87062-6.2699.87032-8.6457-.75846-1.8013-1.90801-3.2112-2.65683-3.9922z" fill="#A88BFA">
           </path>
           <path d="m5.7507 23.5094c.07515.012.15135.0192.2281.0215.81383.0244 2.18251.0952 3.29249.2997.90551.1669 2.70051.6687 4.17761 1.1005 1.1271.3294 2.2886-.5707 2.4522-1.7336.1192-.8481.343-1.8075.7553-2.6869l-.0095.0033c-.6982-1.9471-1.5865-3.2044-2.5178-4.0073-.9284-.8004-1.928-1.1738-2.8932-1.3095-1.60474-.2257-3.07497.1961-4.00103.4682.55465 2.3107.38396 5.0295-1.48417 7.8441z" fill="#A88BFA">
           </path>
           <path d="m17.3708 19.3102c.9267-1.3985 1.5868-2.4862 1.9352-3.0758.1742-.295.1427-.6648-.0638-.9383-.5377-.7126-1.5666-2.1607-2.1272-3.5015-.5764-1.3785-.6624-3.51876-.6673-4.56119-.0019-.39626-.1275-.78328-.3726-1.09465l-3.3311-4.23183c-.0117.19075-.0392.37998-.0788.56747-.1109.52394-.32 1.04552-.5585 1.56101-.1398.30214-.3014.62583-.4646.95284-.1086.21764-.218.4368-.3222.652-.5385 1.11265-1.0397 2.32011-1.1797 3.73901-.1299 1.31514.0478 2.84484.8484 4.67094.1333.0113.2675.0262.4023.0452 1.1488.1615 2.3546.6115 3.4647 1.5685.9541.8226 1.8163 2.0012 2.5152 3.6463z" fill="#A88BFA">
           </path>
           <path d="m39.752 4.5038c-5.952 0-10.248 3.744-10.248 8.88s4.296 8.88 10.248 8.88c5.928 0 10.224-3.744 10.224-8.88s-4.296-8.88-10.224-8.88zm0 3.47999c3.576 0 6.144 2.13601 6.144 5.40001s-2.568 5.4-6.144 5.4c-3.6 0-6.168-2.136-6.168-5.4s2.568-5.40001 6.168-5.40001z" fill="currentColor">
           </path>
           <path d="m55.4847 20.5598c.864.936 2.472 1.704 4.584 1.704 4.32 0 6.8401-2.976 6.8401-6.576 0-3.624-2.5201-6.60001-6.8401-6.60001-2.112 0-3.72.79201-4.584 1.70401v-6.02401h-3.84v17.23201h3.84zm-.12-4.944c0-1.992 1.704-3.432 3.912-3.432 2.112 0 3.888 1.248 3.888 3.504s-1.776 3.48-3.888 3.48c-2.208 0-3.912-1.416-3.912-3.408z" fill="currentColor">
           </path>
           <path d="m67.3181 19.9118c1.464 1.488 4.272 2.352 7.2 2.352 3.96 0 6.936-1.44 6.936-4.392 0-2.88-2.832-3.432-6.072-3.816-2.736-.312-3.576-.384-3.576-1.08 0-.648.864-1.056 2.496-1.056 1.968 0 3.672.6 4.824 1.656l1.992-2.304c-1.272-1.224-3.648-2.18401-6.624-2.18401-4.008 0-6.48 1.72801-6.48 4.32001 0 2.712 2.52 3.312 5.544 3.696 2.832.336 4.032.336 4.032 1.176 0 .792-1.056 1.128-2.784 1.128-2.16 0-4.152-.672-5.664-2.064z" fill="currentColor">
           </path>
           <path d="m82.8395 8.05579h3.912v-3.288h-3.912zm3.864 1.29601h-3.84v12.648h3.84z" fill="currentColor">
           </path>
           <path d="m99.8264 20.5598v1.44h3.8396v-17.23201h-3.8396v6.02401c-.864-.912-2.472-1.70401-4.584-1.70401-4.32 0-6.84 2.97601-6.84 6.60001 0 3.6 2.52 6.576 6.84 6.576 2.112 0 3.72-.768 4.584-1.704zm.12-4.944v.144c0 1.992-1.704 3.408-3.912 3.408-2.112 0-3.888-1.224-3.888-3.48s1.776-3.504 3.888-3.504c2.208 0 3.912 1.44 3.912 3.432z" fill="currentColor">
           </path>
           <path d="m105.996 8.05579h3.912v-3.288h-3.912zm3.864 1.29601h-3.84v12.648h3.84z" fill="currentColor">
           </path>
           <path d="m116.863 22.2638c2.232 0 4.056-.648 5.208-1.656.648 1.2 2.184 1.92 4.992 1.392v-2.832c-1.344.288-1.632-.024-1.632-.696v-4.608c0-3.168-2.376-4.77601-6.408-4.77601-3.48 0-6.264 1.51201-7.056 3.79201l3.456.936c.384-.984 1.704-1.704 3.432-1.704 2.04 0 2.856.768 2.856 1.728v.072l-5.04.456c-2.976.288-5.16 1.512-5.16 3.984 0 2.496 2.232 3.912 5.352 3.912zm4.848-5.112c0 1.464-2.184 2.304-4.152 2.304-1.488 0-2.328-.432-2.328-1.248 0-.84.672-1.152 1.992-1.272l4.488-.456z" fill="currentColor">
           </path>
           <path d="m128.379 21.9998h3.84v-6.048c0-2.184 1.2-3.456 3.288-3.456 1.968 0 3 1.296 3 3.432v6.072h3.84v-7.2c0-3.504-2.232-5.71201-5.52-5.71201-2.04 0-3.624.76801-4.608 1.80001v-1.536h-3.84z" fill="currentColor">
           </path>
          </svg>
         </a>
         <div className="mt-6 text-sm text-gray-500 mb-1">
          Follow us
         </div>
         <div className="grid grid-flow-col gap-3 mb-4 text-sm">
          <a className="font-medium" href="https://twitter.com/obsdmd" rel="noopener noreferrer" target="_blank">
           Twitter
          </a>
          <a className="font-medium" href="https://mas.to/@obsidian" rel="me noopener noreferrer" target="_blank">
           Mastodon
          </a>
          <a className="font-medium" href="https://www.youtube.com/@obsdmd" rel="noopener noreferrer" target="_blank">
           YouTube
          </a>
          <a className="font-medium" href="https://github.com/obsidianmd" rel="noopener noreferrer" target="_blank">
           GitHub
          </a>
         </div>
         <div className="text-sm text-gray-500">
          © 2024 Obsidian
         </div>
        </div>
       </div>
      </div>
      <script src="static.js">
      </script>
      <script src="plugins.js">
      </script>
     </body>
    </html>
)}

export default App;
