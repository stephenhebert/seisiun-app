<template>
  <div>
    <AppHeader />
    <div>
      <AsyncWrapper>
        <slot />
      </AsyncWrapper>
    </div> 
  </div>
</template>