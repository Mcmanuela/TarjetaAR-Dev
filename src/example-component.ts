import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'tarjeta-animations',
  schema: {
    logoModel: ecs.eid,
    licorModel: ecs.eid,
    videoModel: ecs.eid,
  },
  add: (world, component) => {
    const {logoModel, licorModel, videoModel} = component.schemaAttribute.get(component.eid)

    // La animación del logo queda activa al encontrar la tarjeta.
    ecs.Hidden.remove(world, logoModel)
    ecs.Hidden.set(world, licorModel)

    // El primer toque cambia del logo a la animación del licor.
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (event) => {
      const touch = event as unknown as {target?: bigint}
      if (touch.target === videoModel) return
      ecs.Hidden.set(world, logoModel)
      ecs.Hidden.remove(world, licorModel)
    })
  },
})

ecs.registerComponent({
  name: 'video-tap-toggle',
  add: (world, component) => {
    let paused = true
    ecs.VideoControls.set(world, component.eid, {paused})

    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (event) => {
      const touch = event as unknown as {target?: bigint}
      if (touch.target !== component.eid) return
      paused = !paused
      ecs.VideoControls.set(world, component.eid, {paused})
    })
  },
})

ecs.registerComponent({
  name: 'open-map-link',
  add: (world, component) => {
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (event) => {
      const touch = event as unknown as {target?: bigint}
      if (touch.target === component.eid) {
        window.location.assign('https://maps.app.goo.gl/i5iFd1pb9QCWmzmq6')
      }
    })
  },
})

ecs.registerComponent({
  name: 'open-instagram-link',
  add: (world, component) => {
    world.events.addListener(world.events.globalId, ecs.input.SCREEN_TOUCH_START, (event) => {
      const touch = event as unknown as {target?: bigint}
      if (touch.target === component.eid) {
        window.location.assign('https://www.instagram.com/tiendaynnaf?vrfl=MXJub2p6NXh2d3lvMw==')
      }
    })
  },
})
