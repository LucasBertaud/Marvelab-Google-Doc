<template>
  <header class="bg-black text-white backdrop-blur -mb-px sticky top-0 z-50">
    <div class="mx-auto px-4 py-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <NuxtLink to="/" class="flex items-center gap-1.5">
          <img src="https://marvelab.co/_astro/logo-long.c7286a9f.svg" alt="Logo" width="300" height="50" />
        </NuxtLink>
      </div>
      <ul class="justify-end lg:flex-1 items-center gap-x-8 hidden md:flex">
        <li class="relative">
          <NuxtLink to="#" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">Solutions</NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink to="#" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">Produit</NuxtLink>
        </li>
        <li class="relative">
          <NuxtLink to="#" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">Mission</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
  <main class="min-h-[calc(100vh-var(--header-height)-78px)]">
    <div>
      <div class="py-24 sm:py-32 md:py-40 relative text-white bg-black">
        <LandingBackground />
        <WaveDivider />
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-16 flex flex-col">
          <div class="text-center">
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              <div class="">
                <p>
                  <span class="text-primary">Marvelab</span> <br> 
                  <span class="text-4xl">Assistant pour Google Docs</span>
                </p>
              </div>
            </h1>
            <div class="mt-6 text-lg tracking-tight text-white">Un addon puissant pour intégrer vos projets de recherche scientifique directement dans vos documents Google.</div>
          </div>
        </div>
      </div>
      <div class="py-24 sm:py-32 bg-white text-black relative">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Fonctionnalités principales</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Découvrez comment notre addon transforme votre expérience de rédaction scientifique</p>
          </div>
          
          <div class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2">
            <div class="lg:pr-8">
              <div class="lg:max-w-lg">
                <h3 class="text-2xl font-semibold leading-7 text-primary">Gestion de projets scientifiques</h3>
                <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600">
                  <div class="relative pl-10">
                    <dt class="inline font-semibold text-gray-900">
                      <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                      </div>
                      Intégration de projets.
                    </dt>
                    <dd class="inline"> Importez facilement vos projets de recherche depuis l'API Marvelab et insérez-les dans vos documents avec un style professionnel.</dd>
                  </div>
                  
                  <div class="relative pl-10">
                    <dt class="inline font-semibold text-gray-900">
                      <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                        </svg>
                      </div>
                      Notes de recherche.
                    </dt>
                    <dd class="inline"> Ajoutez vos notes de recherche avec un style coloré et professionnel, organisées par projet pour une meilleure lisibilité.</dd>
                  </div>
                  
                  <div class="relative pl-10">
                    <dt class="inline font-semibold text-gray-900">
                      <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                        </svg>
                      </div>
                      Ressources visuelles.
                    </dt>
                    <dd class="inline"> Intégrez automatiquement des images et graphiques depuis l'API, convertis et insérés directement dans votre document.</dd>
                  </div>
                  
                  <div class="relative pl-10">
                    <dt class="inline font-semibold text-gray-900">
                      <div class="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                        </svg>
                      </div>
                      Assistant IA.
                    </dt>
                    <dd class="inline"> Générez des réponses intelligentes basées sur vos projets de recherche grâce à l'intégration d'IA directement dans votre document.</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div class="rounded-xl bg-gray-100 p-4 ring-1 ring-inset ring-gray-900/10 lg:flex lg:flex-col lg:justify-center">
              <h3 class="text-xl font-semibold text-center mb-6">Marvelab Assistant en action</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Assistant IA Feature -->
                <div class="rounded-md bg-white p-4 ring-1 ring-inset ring-gray-900/10 flex flex-col">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Assistant IA intégré</h4>
                  <div class="bg-purple-50 rounded-lg p-3 flex-grow">
                    <img src="/images/assistant-ia.png" alt="Interface de l'Assistant IA Marvelab" class="rounded-lg shadow-sm w-full" />
                    <p class="mt-3 text-sm text-gray-600">Posez vos questions sur votre projet et obtenez des réponses intelligentes directement dans votre document.</p>
                  </div>
                </div>
                
                <!-- Project Details Feature -->
                <div class="rounded-md bg-white p-4 ring-1 ring-inset ring-gray-900/10 flex flex-col">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Détails du projet</h4>
                  <div class="bg-blue-50 rounded-lg p-3 flex-grow">
                    <img src="/images/project-details.png" alt="Détails d'un projet de recherche" class="rounded-lg shadow-sm w-full" />
                    <p class="mt-3 text-sm text-gray-600">Visualisez les informations clés de votre projet, comme la date de création et la description.</p>
                  </div>
                </div>
                
                <!-- Research Notes Feature -->
                <div class="rounded-md bg-white p-4 ring-1 ring-inset ring-gray-900/10 flex flex-col">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Notes de recherche</h4>
                  <div class="bg-red-50 rounded-lg p-3 flex-grow">
                    <img src="/images/research-notes.png" alt="Notes de recherche avec mise en forme" class="rounded-lg shadow-sm w-full" />
                    <p class="mt-3 text-sm text-gray-600">Insérez vos notes de recherche avec un style professionnel et une mise en forme automatique.</p>
                  </div>
                </div>
                
                <!-- Methodologies Feature -->
                <div class="rounded-md bg-white p-4 ring-1 ring-inset ring-gray-900/10 flex flex-col">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Méthodologies</h4>
                  <div class="bg-green-50 rounded-lg p-3 flex-grow">
                    <img src="/images/methodologies.png" alt="Section méthodologies avec approche qualitative" class="rounded-lg shadow-sm w-full" />
                    <p class="mt-3 text-sm text-gray-600">Documentez vos approches méthodologiques avec un style cohérent et professionnel.</p>
                  </div>
                </div>
                
                <!-- Marvelab Assistant Interface -->
                <div class="rounded-md bg-white p-4 ring-1 ring-inset ring-gray-900/10 md:col-span-2 flex flex-col">
                  <h4 class="text-sm font-semibold text-gray-900 mb-3">Interface principale</h4>
                  <div class="bg-gray-50 rounded-lg p-3 flex-grow">
                    <img src="/images/marvelab-interface.png" alt="Interface principale de Marvelab Assistant" class="rounded-lg shadow-sm w-full max-h-64 object-contain" />
                    <p class="mt-3 text-sm text-gray-600">Une interface intuitive pour sélectionner votre projet, insérer du contenu et générer des pages de garde professionnelles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Marvelab - Assistant pour Google Docs',
})
</script>
