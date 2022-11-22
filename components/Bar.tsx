import { FC } from 'react';
import { motion } from 'framer-motion';
import { Stat } from '../types';

const Bar: FC<{ value: Stat }> = ({ value }) => {
  const bar_width = `${value.base_stat}%`;

  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: bar_width,
      transition: {
        duration: 0.4,
        type: 'spring',
        damping: 10, // value of the bounce
        stiffness: 100, //
      },
    },
  };

  return (
    <div className='my-2 text-white bg-gray-300 rounded-full sm:w-[400px]'>
      <motion.div
        className='flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'
        style={{
          width: bar_width,
        }}
        variants={variants}
        initial='initial'
        animate='animate'
      >
        <p className='text-lg font-semibold'>{value.stat.name}</p>
      </motion.div>
    </div>
  );
};
export default Bar;
