#1 Hero секция исчезает и не возвращается при обратной прокрутке вверх. 
#2 Contact исчезает при прокрутке к footer. Нужно, что бы оставался с footer, не исчезая.
#3 Сделай курсор ввиде красной капли. Трэил от курсора сделай толще, и что бы он пропадал полностью при бездействии.
#4 Во втором брауззере нет анимайци и эффектов, курсор не отображается.
#5 Сделай для проектов отдельную страницу, без анимайции видео.
Реактбитс:
Фон:
<div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
  <LiquidEther
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    colors={["#ff5d5d","#ff3535","#f92d2d"]}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    isBounce={false}
    resolution={0.5}
  />
</div>

Папка с карточками проектов (Используй на главной странице в Work):    
import Folder from './Folder'

<div style={{ height: '600px', position: 'relative' }}>
  <Folder size={2} color="#5227FF" className="custom-folder"
  color="#b00000"
/>
</div>